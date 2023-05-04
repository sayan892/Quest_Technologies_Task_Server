const db = require('../Database/db');
exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log("Username is", username);

  if (username !== 'admin') {
    return res.status(422).json({
      error: "Incorrect username",
      data: {
        logstatus: 'Failed',
      },
    });
  } else if (password !== 'test@123') {
    return res.status(422).json({
      error: "Incorrect password",
      data: {
        logstatus: 'Failed',
      },
    });
  }
  else {
    return res.status(200).json({
      data: {
        logstatus: 'success',
      },
    });
  }
}
exports.productadd = (req, res) => {
    const { ProductName, Price, Quantity, Stock } = req.body;
    db.query(
      `INSERT INTO products (ProductName, Price, Quantity, Stock) 
VALUES ('${ProductName}','${Price}','${Quantity}','${Stock}')`,
      (err, data) => {
        if (err) {
          console.log("Error is", err);
          return res.status(422).json({
            error: 'Product could not be added',
          });
        } else {
          return res.status(200).json({
            message: 'Product added',
            data
          });
        }
      }
    );
}
exports.productupdate = (req, res) => {
  const { id, product_name, price, qty, stock } = req.body;
  if (!id) {
    return res.status(422).json({
      error: 'update error',
    });
  } else {
    db.query(
      `UPDATE products SET ProductName="${product_name}",Price="${price}",Quantity="${qty}", Stock="${stock}" WHERE id="${id}"`,
      (err, data) => {
        if (err) {
          console.log('Error is', err);
          return res.status(422).json({
            error: 'Product Update error',
          });
        } else {
          return res.status(200).json({
            message: 'Product updated',
          });
        }
      }
    );
  }
}
exports.productdelete = (req, res) => {
  const { id } = req.body
  if (!id) {
    return res.status(422).json({
      error: 'delete failed!',
    });
  } else {
    db.query(`DELETE FROM products WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log('Error is ', err);
        return res.status(422).json({
          error: 'Project delete Error',
        });
      } else {
        return res.status(200).json({
          message: 'Product deleted'
        })
      }
    })
  }
}
exports.productFetch = (req, res) => {
  let extractedData = [];
  db.query(`SELECT * FROM products `,(err, result) => {
    if (err || !result.length) {
      return res.status(400).json({
        error: 'No Data Found.',
      });
    }
    result.forEach((element) => {
      extractedData.push({id:element.id,productName:element.ProductName,price:element.Price,qty:element.Quantity,stock:element.Stock})
    })
    res.status(200).json({ data: extractedData });
  });
}