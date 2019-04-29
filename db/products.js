const knex = require('./connection');

async function getProducts(departmentId, categoryId, searchString) {

    const queryBuilder = knex
        .select('p.*', 'd.department_id', 'd.name as department_name', 'c.category_id', 'c.name as category_name')
        .from('product AS p')
        .leftOuterJoin("product_category AS pc", "p.product_id", "=", "pc.product_id")
        .leftOuterJoin("category AS c", "c.category_id", "=", "pc.category_id")
        .leftOuterJoin("department AS d", "c.department_id ", "=", "d.department_id");

    if (departmentId) {
        queryBuilder.where("d.department_id", departmentId);
    }

    if (categoryId) {
        queryBuilder.where("c.category_id", categoryId);
    }

    if (searchString) {
        queryBuilder.andWhere(
            function () {
                this.whereRaw("LOWER(p.name) LIKE ?", [`%${searchString.toLowerCase()}%`])
                    .orWhereRaw("LOWER(p.description) LIKE ?", [`%${searchString.toLowerCase()}%`])
                    .orWhereRaw("LOWER(d.description) LIKE ?", [`%${searchString.toLowerCase()}%`])
            }
        )
    }

    return queryBuilder.then(rows => processProducts(rows));
}

const processProducts = rows => {

    const processed = [];
    const departments = [];
    const categories = [];

    rows && rows.forEach(row => {
        if (!departments[row.department_id]) {
            departments[row.department_id] = { id: row.department_id, name: row.department_name }
        }
        if (!categories[row.category_id]) {
            categories[row.category_id] = { id: row.category_id, name: row.category_name }
        }

        if (processed[row.product_id]) {
            const r = processed[row.product_id];
            processed[row.product_id] = {
                ...r,
                departments: [
                    r.departments,
                    {
                        id: row.category_id,
                        name: row.category_name
                    }
                ],
                categories: [
                    r.categories,
                    {
                        id: row.category_id,
                        name: row.category_name
                    }
                ]
            }
        } else {
            processed[row.product_id] = {
                productId: row.product_id,
                name: row.name,
                price: row.price,
                discountedPrice: row.discounted_price,
                image: row.image,
                departments: [
                    {
                        id: row.department_id,
                        name: row.department_name
                    }
                ],
                categories: [
                    {
                        id: row.category_id,
                        name: row.category_name
                    }
                ]
            };
        }
    });

    return {
        products: processed.filter(e => e),
        departments: departments.filter(e => e),
        categories: categories.filter(e => e)
    };
}

async function getProductAttributes(productId) {
    return knex
        .select("name", "value", "av.attribute_value_id as id")
        .from("product_attribute as pa")
        .innerJoin("attribute_value as av", "pa.attribute_value_id", "=", "av.attribute_value_id")
        .innerJoin("attribute as a", "av.attribute_id", "=", "a.attribute_id")
        .where("product_id", productId).then(rows => processProductAttributes(rows));
}

const processProductAttributes = rows => {
    const attributes = [];
    rows && rows.forEach(row => {
        attributes.push({
            id: row.id,
            name: row.name,
            value: row.value
        });
    })
    return attributes;
}

async function getProduct(productId) {

    return knex
        .select("p.*", "a.name as attr_name", "av.value as attr_value", "av.attribute_value_id as attr_value_id")
        .from("product as p")
        .innerJoin("product_attribute as pa", "pa.product_id", "=", "p.product_id")
        .innerJoin("attribute_value as av", "av.attribute_value_id", "=", "pa.attribute_value_id")
        .innerJoin("attribute as a", "a.attribute_id", "=", "av.attribute_id")
        .where("p.product_id", productId)
        .then(rows => processProduct(rows));
}

const processProduct = rows => {
    var product;
    if (rows && rows.length > 0) {
        const row = rows[0];
        product = {
            productId: row.product_id,
            name: row.name,
            description: row.description,
            price: row.price,
            discountedPrice: row.discounted_price,
            image: row.image,
            image2: row.image_2,
            thumbnail: row.thumbnail,
            display: row.display
        }

        const sizes = [];
        const colors = [];

        rows.forEach(row => {
            if (row.attr_name == "Size") {
                sizes.push({ id: row.attr_value_id, value: row.attr_value });
            } else if (row.attr_name == "Color") {
                colors.push({ id: row.attr_value_id, value: row.attr_value })
            }
        });

        product.sizes = sizes;
        product.colors = colors;
    }

    return product;
}

module.exports = {
    getProducts,
    getProductAttributes,
    getProduct
}