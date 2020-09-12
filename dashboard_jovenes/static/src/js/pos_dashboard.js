odoo.define('dashboard_jovenes.Dashboard', function (require) {
"use strict";

var AbstractAction = require('web.AbstractAction');
var ajax = require('web.ajax');
var core = require('web.core');
var rpc = require('web.rpc');
var session = require('web.session');
var web_client = require('web.web_client');
var _t = core._t;
var QWeb = core.qweb;

var YoungDashboard = AbstractAction.extend({
    template: 'YoungDashboard',
    events: {
            'click .pos_order_today':'pos_order_today',
            'click .pos_order':'pos_order',
            'click .pos_total_sales':'pos_order',
            'click .pos_session':'pos_session',
            'click .pos_refund_orders':'pos_refund_orders',
            'click .pos_refund_today_orders':'pos_refund_today_orders',
            //'change #pos_sales': 'onclick_pos_sales',
    },

    init: function(parent, context) {
        this._super(parent, context);
        this.dashboards_templates = ['PosOrders','PosChart'];//,'PosCustomer'];
        this.total_young = [];
        this.total_job = [];
        this.job_category = [];
        this.back_study = [];
        this.entrepreneurship = [];
        this.category_a = [];
        this.category_b = [];
        this.category_c = [];
        this.category_d = [];
        this.category_e = [];
        this.category_f = [];
        this.no_category =[];
    },

    willStart: function() {
        var self = this;
        return $.when(ajax.loadLibs(this), this._super()).then(function() {
            return self.fetch_data();
        });
    },

    start: function() {
        var self = this;
        this.set("title", 'Dashboard');
        return this._super().then(function() {
            self.render_dashboards();
            self.render_graphs();
            self.$el.parent().addClass('oe_background_grey');
        });
    },

    fetch_data: function() {
      var self = this;
      var def1 =  this._rpc({
              model: 'young.curriculum.vitae',
              method: 'total_young',
      }).then(function(result) {
         self.total_young = result['total_young'],
         self.total_job = result['total_job']
         self.job_category = result['job_category']
         self.back_study = result['back_study']
         self.entrepreneurship = result['entrepreneurship']
         self.category_a = result['category_a']
         self.category_b = result['category_b']
         self.category_c = result['category_c']
         self.category_d = result['category_d']
         self.category_e = result['category_e']
         self.category_f = result['category_f']
         self.no_category = result['no_category']
      });
      //var def2 = self._rpc({
      //      model: "young.curriculum.vitae",
      //      method: "get_details", //
      //  })
      //  .then(function (res) {
      //      self.payment_details = res['payment_details'];
      //      self.top_salesperson = res['salesperson'];
      //      self.selling_product = res['selling_product'];
      //  });
        return def1//$.when(def1);
    },

    render_dashboards: function() {
        var self = this;
            _.each(this.dashboards_templates, function(template) {
                self.$('.o_young_dashboard').append(QWeb.render(template, {widget: self}));
            });
    },
      render_graphs: function(){
        var self = this;
         self.render_top_customer_graph();
         self.render_top_product_graph();
         self.render_product_category_graph();
         self.onclick_pos_sales();
    },



       pos_order_today: function(e){
        var self = this;
        var date = new Date();
        var yesterday = new Date(date.getTime());
        yesterday.setDate(date.getDate() - 1);
        console.log(yesterday)
        e.stopPropagation();
        e.preventDefault();

        session.user_has_group('hr.group_hr_user').then(function(has_group){
            if(has_group){
                var options = {
                    on_reverse_breadcrumb: self.on_reverse_breadcrumb,
                };
                self.do_action({
                    name: _t("Today Order"),
                    type: 'ir.actions.act_window',
                    res_model: 'young.curriculum.vitae',
                    view_mode: 'tree,form',
                    view_type: 'form',
                    views: [[false, 'list'],[false, 'form']],
//                    domain: [['date_order','<=', date],['date_order', '>=', yesterday]],
                    target: 'current'
                }, options)
            }
        });

    },


      pos_refund_orders: function(e){
        var self = this;
        var date = new Date();
//        alert(date,"date")
        var yesterday = new Date(date.getTime());
        yesterday.setDate(date.getDate() - 1);
        console.log(yesterday)
        e.stopPropagation();
        e.preventDefault();

        session.user_has_group('hr.group_hr_user').then(function(has_group){
            if(has_group){
                var options = {
                    on_reverse_breadcrumb: self.on_reverse_breadcrumb,
                };
                self.do_action({
                    name: _t("Refund Orders"),
                    type: 'ir.actions.act_window',
                    res_model: 'young.curriculum.vitae',
                    view_mode: 'tree,form',
                    view_type: 'form',
                    views: [[false, 'list'],[false, 'form']],
//                    domain: [['amount_total', '<', 0.0]],
//                    domain: [['date_order', '=', date]],
                    target: 'current'
                }, options)
            }
        });

    },
    pos_refund_today_orders: function(e){
        var self = this;
        var date = new Date();
//        alert(date,"date")
        var yesterday = new Date(date.getTime());
        yesterday.setDate(date.getDate() - 1);
        console.log(yesterday)
        e.stopPropagation();
        e.preventDefault();

        session.user_has_group('hr.group_hr_user').then(function(has_group){
            if(has_group){
                var options = {
                    on_reverse_breadcrumb: self.on_reverse_breadcrumb,
                };
                self.do_action({
                    name: _t("Refund Orders"),
                    type: 'ir.actions.act_window',
                    res_model: 'young.curriculum.vitae',
                    view_mode: 'tree,form',
                    view_type: 'form',
                    views: [[false, 'list'],[false, 'form']],
//                    domain: [['amount_total', '<', 0.0],['date_order','<=', date],['date_order', '>=', yesterday]],
//                    domain: [['date_order', '=', date]],
                    target: 'current'
                }, options)
            }
        });

    },

        pos_order: function(e){
        var self = this;
        var date = new Date();
        var yesterday = new Date(date.getTime());
        yesterday.setDate(date.getDate() - 1);
        console.log(yesterday)
        e.stopPropagation();
        e.preventDefault();
        session.user_has_group('hr.group_hr_user').then(function(has_group){
            if(has_group){
                var options = {
                    on_reverse_breadcrumb: self.on_reverse_breadcrumb,
                };
                self.do_action({
                    name: _t("Total Order"),
                    type: 'ir.actions.act_window',
                    res_model: 'young.curriculum.vitae',
                    view_mode: 'tree,form',
                    view_type: 'form',
                    views: [[false, 'list'],[false, 'form']],
//                    domain: [['amount_total', '<', 0.0]],
                    target: 'current'
                }, options)
            }
        });

    },
    pos_session: function(e){
        var self = this;
        e.stopPropagation();
        e.preventDefault();
        session.user_has_group('hr.group_hr_user').then(function(has_group){
            if(has_group){
                var options = {
                    on_reverse_breadcrumb: self.on_reverse_breadcrumb,
                };
                self.do_action({
                    name: _t("sessions"),
                    type: 'ir.actions.act_window',
                    res_model: 'young.curriculum.vitae',
                    view_mode: 'tree,form',
                    view_type: 'form',
                    views: [[false, 'list'],[false, 'form']],
//                     domain: [['state','=', In Progress]],
                    target: 'current'
                }, options)
            }
        });

    },
 //grafico de barras vertical
     onclick_pos_sales:function(){ //(events)
        // var option = $(events.target).val();
        // console.log('came monthly')
       var self = this
        var ctx = self.$(".other_graph");
            rpc.query({
                model: "young.curriculum.vitae",
                method: "get_other_graph", // get_department
                //args: [option],
            }).then(function (arrays) {
            console.log(arrays)
          var data = {
            labels: arrays[1],
            datasets: [
              {
                label: arrays[2],
                data: arrays[0],
                backgroundColor: [
                  "rgba(255, 99, 132,1)",
                  "rgba(54, 162, 235,1)",
                  "rgba(75, 192, 192,1)",
                  "rgba(153, 102, 255,1)",
                  "rgba(10,20,30,1)"
                ],
                borderColor: [
                 "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(10,20,30,0.3)"
                ],
                borderWidth: 1
              },
              {
                label: arrays[2],
                data: arrays[0],
                backgroundColor: [
                  "rgba(255, 99, 132,1)",
                  "rgba(54, 162, 235,1)",
                  "rgba(75, 192, 192,1)",
                  "rgba(153, 102, 255,1)",
                  "rgba(10,20,30,1)"
                ],
                borderColor: [
                 "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(10,20,30,0.3)"
                ],
                borderWidth: 1
              }

            ]
          };

  //options
          var options = {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: "Generos de los Jovenes",
              fontSize: 18,
              fontColor: "#111"
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#333",
                fontSize: 16
              }
            },
            scales: {
              xAxes: [{
                   gridLines: {
                       display:false
                   }
               }],
              yAxes: [{
                   gridLines: {
                       display:false
                   }
               }]
              /*yAxes: [{
                ticks: {
                  min: 0
                }
              }]*/
            },
            animation: {
  onComplete: function () {
    var chartInstance = this.chart;
    var ctx = chartInstance.ctx;
    console.log(chartInstance);
    var height = chartInstance.controller.boxes[0].bottom;
    ctx.textAlign = "center";
    Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
      var meta = chartInstance.controller.getDatasetMeta(i);
      Chart.helpers.each(meta.data.forEach(function (bar, index) {
        ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 2));
      }),this)
    }),this);
  }
}
          /*  animation: {
              animateScale: true,
              animateRotate: true
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                	var dataset = data.datasets[tooltipItem.datasetIndex];
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  var currentValue = dataset.data[tooltipItem.index];
                  var precentage = Math.floor(((currentValue/total) * 100)+0.5);
                  return precentage + "%";
                }
              }
            }*/
          };

          //create Chart class object
          if (window.myCharts != undefined)
          window.myCharts.destroy();
          window.myCharts = new Chart(ctx, {
//          var chart = new Chart(ctx, {
            type: "bar",
            data: data,
            options: options
          });

        });
        },


     render_top_customer_graph:function(){
       var self = this
        var ctx = self.$(".top_customer");
            rpc.query({
                model: "young.curriculum.vitae",
                method: "get_gender", // get_the_top_customer
            }).then(function (arrays) {


          var data = {
            labels: arrays[1],
            datasets: [
              {
                label: "",
                data: arrays[0],
                backgroundColor: [
                  "rgb(148, 22, 227)",
                  "rgba(54, 162, 235)",
                  "rgba(75, 192, 192)",
                  "rgba(153, 102, 255)",
                  "rgba(10,20,30)"
                ],
                borderColor: [
                 "rgba(255, 99, 132,)",
                  "rgba(54, 162, 235,)",
                  "rgba(75, 192, 192,)",
                  "rgba(153, 102, 255,)",
                  "rgba(10,20,30,)"
                ],
                borderWidth: 1
              },

            ]
          };

  //options
          var options = {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: " Grafico Generos Circular",
              fontSize: 18,
              fontColor: "#111"
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#333",
                fontSize: 16
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: 0
                }
              }]
            }
          };

          //create Chart class object
          var chart = new Chart(ctx, {
            type: "pie",
            data: data,
            options: options
          });

        });
        },

     render_top_product_graph:function(){
       var self = this
        var ctx = self.$(".top_selling_product");
            rpc.query({
                model: "young.curriculum.vitae",
                method: "get_categories", // get_the_top_products
            }).then(function (arrays) {


          var data = {
            labels: arrays[1],
            datasets: [
              {
                label: "Cantidad de Jovenes",
                data: arrays[0],
                backgroundColor: [
                  "rgba(255, 99, 132,1)",
                  "rgba(54, 162, 235,1)",
                  "rgba(75, 192, 192,1)",
                  "rgba(153, 102, 255,1)",
                  "rgba(10,20,30,1)",
                  "rgba(255,125,0,1)",
                  "rgba(0, 255, 0, 1)",
                  "rgba(200,0,0,0.5)",
                ],
                borderColor: [
                 "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(10,20,30,0.3)",
                  "rgba(255,125,0,0.4)",
                  "rgba(0, 255, 0, 0.2)",
                  "rgba(200,0,0,0.2)",

                ],
                borderWidth: 1
              },

            ]
          };

  //options
          var options = {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: " Categorias",
              fontSize: 18,
              fontColor: "#111"
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#333",
                fontSize: 16
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: 0
                }
              }]
            }
          };

          //create Chart class object
          var chart = new Chart(ctx, {
            type: "horizontalBar",
            data: data,
            options: options
          });

        });
        },

     render_product_category_graph:function(){
           var self = this
        var ctx = self.$(".top_product_categories");
            rpc.query({
                model: "young.curriculum.vitae",
                method: "get_gender", // get_the_top_categories
            }).then(function (arrays) {


          var data = {
            labels: arrays[1],
            datasets: [
              {
                label: "Cantidad de Jovenes",
                data: arrays[0],
                backgroundColor: [
                  "rgba(54, 162, 235,1)",
                  "rgba(255, 99, 132,1)",
                  "rgba(75, 192, 192,1)",
                ],
                borderColor: [
                 "rgba(54, 162, 235, 0.2)",
                 "rgba(255, 99, 132, 0.2)",
                 "rgba(75, 192, 192, 0.2)",
                ],
                borderWidth: 1
              },


            ]
          };

  //options
          var options = {
            responsive: true,
            title: {
              display: true,
              position: "top",
              text: "Generos",
              fontSize: 18,
              fontColor: "#111"
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#333",
                fontSize: 16
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  min: 0
                }
              }]
            }
          };

          //create Chart class object
          var chart = new Chart(ctx, {
            type: "horizontalBar",
            data: data,
            options: options
          });

        });
        },
});


core.action_registry.add('dashboard_young', YoungDashboard);

return YoungDashboard;

});
