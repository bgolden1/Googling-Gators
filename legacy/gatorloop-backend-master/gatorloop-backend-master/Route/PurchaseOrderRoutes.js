const express = require("express");

const purchaseOrderController = require("../Controller/PurchaseOrderController");

let router = express.Router();

//core
router.get("/po", purchaseOrderController.getAll);
router.get("/po/:num", purchaseOrderController.get);
router.put("/po/:num", purchaseOrderController.update);
router.post("/po", purchaseOrderController.create);
router.delete("/po/:num", purchaseOrderController.delete);
//router.post("/api/po/:num/status", purchaseOrderController.updateStatus);

//utility
router.get("/po/sub/:subteam", purchaseOrderController.getBySubteam);
router.get("/po/user/:email", purchaseOrderController.getByUser);

module.exports = router;