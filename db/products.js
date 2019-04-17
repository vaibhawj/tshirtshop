const pool = require('./connectionUtil');

async function getProducts() {
    return new Promise((resolve, reject) => {
        pool.query(`select p.*, d.department_id, d.name as department_name, c.category_id, c.name as category_name from product p 
        left outer join product_category pc on p.product_id = pc.product_id 
        left outer join category c on c.category_id = pc.category_id
        left outer join department d on c.department_id = d.department_id;`, function (error, results, fields) {
                if (error) throw error;
                resolve(processProducts(results));
            });
    });
}

const processProducts = rows => {

    const processed = [];
    const departments = [];
    const categories = [];

    rows.forEach(row => {
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

module.exports = {
    getProducts
}