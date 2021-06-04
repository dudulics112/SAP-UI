sap.ui.define(
   ["sap/ui/core/mvc/Controller","sap/ui/model/resource/ResourceModel", "sap/m/MessageToast"],
   function (Controller,ResourceModel, MessageToast) {
     "use strict";
     return Controller.extend("org.ubb.books.controller.App", {
       onInit: function () {
         var oViewModel = new sap.ui.model.json.JSONModel({
           Isbn: null,
           Titel: null,
           Author: null,
           Language: null,
           DatePublished: null,
           AvailableBookNr: null,
           TotalBookNr: null,
         });
         this.getView().setModel(oViewModel, "view");
 
         var isEditingModel = new sap.ui.model.json.JSONModel({
           isEditLive: false,
         });
 
         this.getView().setModel(isEditingModel, "editModel");
         var i18nModel = new ResourceModel({
          bundleName: "org.ubb.books.i18n.i18n",
        });
        this.getView().setModel(i18nModel, "i18n");
       },
       deleteBook: function (oEvent) {
         var oButton = oEvent.getSource();
         var oRow = oButton.getParent();
         var selectedIsbn = oRow.getCells()[0].mProperties.text;
 
         var oModel = this.getView().getModel();
         var current = this;
         oModel.remove("/Books('" + selectedIsbn + "')", {
           method: "DELETE",
           success: function (data) {
             console.log(data);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("DeleteSuccess")
            );
           },
           error: function (e) {
             console.log(e.error);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("Error")
            );
           },
         });
       },
       addBook: function () {
         // GET INPUT DATA
         var oViewModel = this.getView().getModel("view");
         var book = {
           Isbn: oViewModel.oData.Isbn,
           Titel: oViewModel.oData.Titel,
           Author: oViewModel.oData.Author,
           Language: oViewModel.oData.Language,
           DatePublished: new Date(oViewModel.oData.DatePublished),
           AvailableBookNr: parseInt(oViewModel.oData.AvailableBookNr),
           TotalBookNr: parseInt(oViewModel.oData.TotalBookNr),
         };
 
         // Request
         var current = this;
         var oModel = this.getView().getModel();
         oModel.create("/Books", book, {
           method: "POST",
           success: function (data) {
             console.log(data);
             oViewModel.setProperty("/Isbn", null);
             oViewModel.setProperty("/Titel", null);
             oViewModel.setProperty("/Author", null);
             oViewModel.setProperty("/DatePublished", null);
             oViewModel.setProperty("/Language", null);
             oViewModel.setProperty("/AvailableBookNr", null);
             oViewModel.setProperty("/TotalBookNr", null);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("AddSuccess")
            );
           },
           error: function (e) {
             console.log(e.error);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("Error")
            );
           },
         });
       },
       startBookEdit: function (oEvent) {
         var oViewModel = this.getView().getModel("view");
         var oButton = oEvent.getSource();
         var oRow = oButton.getParent();
         var bookDate = new Date(oRow.getCells()[2].mProperties.text);
         console.log(oRow.getCells()[5].mProperties.text);
         console.log(oRow.getCells()[0].mProperties);
         oViewModel.setProperty("/Isbn", oRow.getCells()[0].mProperties.text);
         oViewModel.setProperty("/Titel", oRow.getCells()[0].mProperties.title);
         oViewModel.setProperty("/Author", oRow.getCells()[1].mProperties.text);
         oViewModel.setProperty(
           "/DatePublished",
           bookDate.getFullYear() +
             "-" +
             String(bookDate.getMonth() + 1).padStart(2, "0") +
             "-" +
             String(bookDate.getDate()).padStart(2, "0")
         );
         oViewModel.setProperty(
           "/Language",
           oRow.getCells()[3].mProperties.text
         );
         oViewModel.setProperty(
           "/AvailableBookNr",
           oRow.getCells()[4].mProperties.text
         );
         oViewModel.setProperty(
           "/TotalBookNr",
           oRow.getCells()[5].mProperties.text
         );
 
        // var oEditModel = this.getView().getModel("editModel");
         //oEditModel.setProperty("/isEditLive", true);
       },
 
       editBook: function () {
         var oViewModel = this.getView().getModel("view");
         var book = {
           Isbn: oViewModel.oData.Isbn,
           Titel: oViewModel.oData.Titel,
           Author: oViewModel.oData.Author,
           Language: oViewModel.oData.Language,
           DatePublished: new Date(oViewModel.oData.DatePublished),
           AvailableBookNr: parseInt(oViewModel.oData.AvailableBookNr),
           TotalBookNr: parseInt(oViewModel.oData.TotalBookNr),
         };
 
         // Request
         var current = this;
         var oModel = this.getView().getModel();
         oModel.update("/Books('" + book.Isbn + "')", book, {
           method: "PATCH",
           success: function (data) {
             console.log(data);
             oViewModel.setProperty("/Isbn", null);
             oViewModel.setProperty("/Titel", null);
             oViewModel.setProperty("/Author", null);
             oViewModel.setProperty("/DatePublished", null);
             oViewModel.setProperty("/Language", null);
             oViewModel.setProperty("/AvailableBookNr", null);
             oViewModel.setProperty("/TotalBookNr", null);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("EditSuccess")
            );
           },
           error: function (e) {
             console.log(e);
             MessageToast.show(
              current
                .getView()
                .getModel("i18n")
                .getResourceBundle()
                .getText("Error")
            );
           },
         });
       },
     });
   }
 );