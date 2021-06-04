sap.ui.define(
	[
	  "sap/ui/core/mvc/Controller",
	  "sap/ui/model/resource/ResourceModel",
	  "sap/m/MessageToast",
	  "sap/m/MessageBox",
	  "sap/ui/model/Sorter",
	  "sap/ui/model/Filter",
	  "sap/ui/model/FilterOperator",
	  "sap/ui/model/FilterType",
	  "sap/ui/model/json/JSONModel",
	],
	function (Controller, ResourceModel) {
	  "use strict";
  
	  return Controller.extend("org.ubb.books.controller.BookView", {
		onInit: function () {
		  // set i18n model on view
		  var i18nModel = new ResourceModel({
			bundleName: "org.ubb.books.i18n.i18n",
		  });
		  this.getView().setModel(i18nModel, "i18n");
		},
	
	  });
	}
  );