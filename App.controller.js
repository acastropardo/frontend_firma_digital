sap.ui.define([
  "jquery.sap.global",
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
], function (jQuery, Controller,  JSONModel, MessageToast ) {
   "use strict";

      var host = "localhost:9999";
      var remoto = "165.227.205.2:9999"; 
      var servicio = "firmad";
      var server = host;
   
   return Controller.extend("HelloWorld.App", {


      onAceptar: function () {
         

        this.getView().setBusy(true);

         //var oHtml = this.getView().byId("pdfContainer");
         var clave = this.getView().byId("password").getValue();

         if (clave != ""){
          MessageToast.show("Firmando Aceptado");

         //var content = '<iframe height="100%" width="100%" allowfullscreen src="http://'+server+'/firmar?id=23018996-K&motivo=prueba_aceptado&clave='+clave+'" ></iframe>';
          //MessageToast.show(content);

          //oHtml.setContent(content);

          var oModel = new JSONModel({
            Source: 'http://'+server+'/firmar?id=23018996-K&clave='+clave+'&motivo=prueba_aceptado',
            Title: "Documento Aceptado",
            Height: "600px"
            
            });

            
            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);
       }
       else{
        MessageToast.show("Debe ingresar una clave");
       }

         this.getView().setBusy(false);

      },

      onRechazar: function(){
        MessageToast.show("Firmando Rechazado");
        this.getView().setBusy(true);

        

         var clave = this.getView().byId("password").getValue();

          if (clave != ""){

            var oModel = new JSONModel({
            Source: 'http://'+server+'/firmar?id=23018996-K&clave='+clave+'&motivo=prueba_rechazado',
            Title: "Documento Rechazado",
            Height: "600px"
            
            });

            
            this.getView().setModel(oModel);

            var pdf = this.getView().byId("PDFViewer");

            pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);

          }
          else{
            MessageToast.show("Debe ingresar una clave");
          }
          this.getView().setBusy(false);

      },

      _onValidarPDF: function(oEvent){
          oEvent.preventDefault();
          //MessageToast.show("ERROR PDF");
      },


      onInit: function(){
        this.getView().setBusy(true);


///

        // var aData = jQuery.ajax({
        //         type : "GET",
        //         contentType : "application/json",
        //         url : "http://165.227.205.2/sso/sf",
        //         dataType : "json",
        //         success : function(data,textStatus, jqXHR) {
        //             oModel.setData({modelData : data}); 
        //             alert("success to post");
        //             MessageToast.show(data);
        //         }

        //     });

//

        
        var oModel = new JSONModel({
        Source: 'http://'+server+'/visualizar?id=23018996-K',
        Title: "Documento a firmar",
        Height: "600px"
        
        });

        
        this.getView().setModel(oModel);

        var pdf = this.getView().byId("PDFViewer");

        pdf.attachSourceValidationFailed(oModel, this._onValidarPDF);


        //var content = '<iframe src="http://'+server+'/visualizar?id=23018996-K"  height="90%" width="90%" allowfullscreen ></iframe>';

        //var oHtml = this.getView().byId("pdfContainer");

        //oHtml.setContent(content);

        this.getView().setBusy(false);






      }
   });
});