const pool = require('./connectionUtil');

async function getProducts(departmentId, categoryId, searchString) {
    return new Promise((resolve, reject) => {
        var sql = `select p.*, d.department_id, d.name as department_name, c.category_id, c.name as category_name from product p 
        left outer join product_category pc on p.product_id = pc.product_id 
        left outer join category c on c.category_id = pc.category_id
        left outer join department d on c.department_id = d.department_id `;

        if (departmentId || categoryId || searchString) {
            sql = sql + "where ";
            if (departmentId) {
                sql = sql + `d.department_id=${departmentId} `;
            }
            if (categoryId) {
                if (departmentId) {
                    sql = sql + "and ";
                }
                sql = sql + `c.category_id=${categoryId} `;
            }
            if (searchString) {
                if (departmentId || categoryId) {
                    sql = sql + "and ";
                }
                sql = sql + `(LOWER(p.name) like '%${searchString.toLowerCase()}%' 
                            or LOWER(p.description) like '%${searchString.toLowerCase()}%'
                            or LOWER(d.description) like '%${searchString.toLowerCase()}%')`;
            }
        }
        sql = sql + ";";
        pool.query(sql, function (error, results, fields) {
            if (error) throw (error);
            resolve(processProducts(results));
        });
    }).catch(e => console.log(e));
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
                description: row.description,
                price: row.price,
                discountedPrice: row.discounted_price,
                image: row.image,
                image2: row.image_2,
                thumbnail: row.thumbnail,
                display: row.display,
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
    return new Promise((resolve, reject) => {
        var sql = `select name, value , av.attribute_value_id as id from product_attribute pa
        inner join attribute_value av on av.attribute_value_id = pa.attribute_value_id
        inner join attribute a on a.attribute_id = av.attribute_id where product_id=${productId};`;

        pool.query(sql, function (error, results, fields) {
            if (error) throw (error);
            resolve(processProductAttributes(results));
        });
    }).catch(e => console.log(e));
}

const processProductAttributes = rows => {
    const sizes = [];
    const colors = [];
    rows && rows.forEach(row => {
        if (row.name == "Size") {
            sizes.push({ value: row.value, id: row.id });
        } else if (row.name == "Color") {
            colors.push({ value: row.value, id: row.id });
        }
    })
    return { sizes, colors };
}

module.exports = {
    getProducts,
    getProductAttributes
}