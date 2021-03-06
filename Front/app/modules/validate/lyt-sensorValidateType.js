//radio
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'sweetAlert',
  'translater',
  'config',
  'ns_grid/model-grid',
  'ns_modules/ns_com',
  './lyt-sensorValidateDetail',
  './lyt-camTrapValidateDetail'
], function($, _, Backbone, Marionette, Swal, Translater, config, NsGrid, Com, LytSensorValidateDetail , LytCamTrapValidateDetail) {

  'use strict';

  return Marionette.LayoutView.extend({

    template: 'app/modules/validate/templates/tpl-sensorValidateType.html',
    className: 'full-height animated rel',

    events: {
      'click button#autoValidate': 'autoValidate',
      'change select#frequency': 'setFrequency',
      'click button#back': 'back',
      'click button#hideDetail': 'hideDetail',
    },

    ui: {
      'grid': '#grid',
      'paginator': '#paginator',
      'legend' : '#legendSample',
      'frequency': 'select#frequency',
      'detail': '#detail',
    },

    regions: {
      'rgDetail': '#detail'
    },

    initialize: function(options) {
      this.translater = Translater.getTranslater();
      this.type_ = options.type;
      this.com = new Com();
    },

    back: function() {
      Backbone.history.navigate('validate', {trigger: true});
    },

    hideDetail: function() {
      this.ui.detail.addClass('hidden');
    },

    onRender: function() {
      this.$el.i18n();
    },

    onShow: function() {
      this.ui.frequency.find('option[value="all"]').prop('selected', true);
      switch (this.type_){
        case 'rfid':
          this.ui.frequency.find('option[value="60"]').prop('selected', true);

          this.cols = [
            {
              name: 'UnicIdentifier',
              label: 'Unique Identifier',
              editable: false,
              cell: 'string'
            },{
              name: 'FK_Sensor',
              label: 'FK_Sensor',
              editable: false,
              renderable: false,
              cell: 'string'
            },{
              name: 'equipID',
              label: 'equipID',
              editable: false,
              renderable: false,
              cell: 'string'
            }, {
              name: 'site_name',
              label: 'site name',
              editable: false,
              cell: 'string'
            }, {
              name: 'site_type',
              label: 'site type',
              editable: false,
              cell: 'string',
            }, {
              name: 'StartDate',
              label: 'Start Date',
              editable: false,
              cell: 'string',
            }, {
              name: 'EndDate',
              label: 'End Date',
              editable: false,
              cell: 'string',
            }, {
              name: 'nb_chip_code',
              label: 'nb indiv',
              editable: false,
              cell: 'string',
            },{
              name: 'total_scan',
              label: 'total scan',
              editable: false,
              cell: 'string',
            },{
              name: 'first_scan',
              label: 'first scan',
              editable: false,
              cell: 'string',
            },{
              name: 'last_scan',
              label: 'last scan',
              editable: false,
              cell: 'string',
            }, {
              name: 'import',
              editable: true,
              label: 'IMPORT',
              cell: 'select-row',
              headerCell: 'select-all'
            }
          ];
          break;
        case 'gsm':
          this.ui.frequency.find('option[value="60"]').prop('selected', true);
          this.cols = [
            {
              name: 'FK_ptt',
              label: 'Unique Identifier',
              editable: false,
              cell: 'string'
            },
            {
              name: 'FK_Individual',
              label: 'Individual ID',
              editable: false,
              cell: 'string',
              formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue, model) {
                  if (rawValue == null) {
                    rawValue = '<span class="bull-warn">&#x25cf;</span> No Individual attached !';
                  }
                  return rawValue;
                }
            }),
            },{
              name: 'Survey_type',
              label: 'Survey Type',
              editable: false,
              cell: 'string'
            },
            {
              name: 'FK_Sensor',
              label: 'FK_Sensor',
              editable: false,
              cell: 'string',
              renderable: false
            },
            {
              name: 'nb',
              label: 'NB',
              editable: false,
              cell: 'string'
            }, {
              name: 'StartDate',
              label: 'Start equipment',
              editable: false,
              cell: 'string',
            }, {
              name: 'EndDate',
              label: 'End equipment',
              editable: false,
              cell: 'string',
            }, {
              name: 'min_date',
              label: 'Data from',
              editable: false,
              cell: 'string',
            }, {
              name: 'max_date',
              label: 'Data To',
              editable: false,
              cell: 'string',
            }, {
              name: 'import',
              editable: true,
              label: 'IMPORT',
              cell: 'select-row',
              headerCell: 'select-all'
            }
          ];
          break;
        case 'argos':
          this.ui.frequency.find('option[value="all"]').prop('selected', true);
          this.cols = [
            {
              name: 'FK_ptt',
              label: 'Sensor Identifier',
              editable: false,
              cell: 'string'
            },
            {
              name: 'FK_Individual',
              label: 'Individual ID',
              editable: false,
              cell: 'string',
              formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                fromRaw: function(rawValue, model) {
                  if (rawValue == null) {
                    rawValue = '<span class="bull-warn">&#x25cf;</span> No Individual attached !';
                  }
                  return rawValue;
                }
              }),
            },{
              name: 'Survey_type',
              label: 'Survey Type',
              editable: false,
              cell: 'string'
            },{
              name: 'FK_Sensor',
              label: 'Sensor',
              editable: false,
              renderable: false,
              cell: 'string'
            }, {
              name: 'nb',
              label: 'NB',
              editable: false,
              cell: 'string'
            }, {
              name: 'StartDate',
              label: 'Start equipment',
              editable: false,
              cell: 'string',
            }, {
              name: 'EndDate',
              label: 'End equipment',
              editable: false,
              cell: 'string',
            }, {
              name: 'min_date',
              label: 'Data from',
              editable: false,
              cell: 'string',
            }, {
              name: 'max_date',
              label: 'Data To',
              editable: false,
              cell: 'string',
            }, {
              editable: true,
              name: 'import',
              label: 'IMPORT',
              cell: 'select-row',
              headerCell: 'select-all'
            }
          ];
          break;
          case 'camtrap':
            //this.ui.frequency.find('option[value="60"]').prop('selected', true);
            this.ui.frequency.addClass('hidden');
            this.ui.legend.addClass('hidden');

            this.cols = [
              {
                name: 'UnicIdentifier',
                label: 'Unique Identifier',
                editable: false,
                cell: 'string'
              },{
                name: 'fk_sensor',
                label: 'FK_Sensor',
                editable: false,
                renderable: false,
                cell: 'integer'
              },{
                name: 'site_name',
                label: 'site name',
                editable: false,
                cell: 'string'
              },{
                name: 'FK_MonitoredSite',
                label: 'siteID',
                editable: false,
                renderable: false,
                cell: 'integer'
              },{
                name: 'site_type',
                label: 'site type',
                editable: false,
                cell: 'string',
              }, {
                name: 'StartDate',
                label: 'Start Date',
                editable: false,
                cell: 'string',
              }, {
                name: 'EndDate',
                label: 'End Date',
                editable: false,
                cell: 'string',
              }, {
                name: 'nb_photo',
                label: 'nb photos',
                editable: false,
                cell: 'string',
              },{
                name: 'import',
                editable: true,
                label: 'IMPORT',
                cell: 'select-row',
                headerCell: 'select-all'
              }
            ];
            break;
        default:
          console.warn('type error');
          break;
      }

      this.displayGrid();
      //this.frequency = this.ui.frequency.val();
    },

    setFrequency: function(e) {
      this.frequency = $(e.target).val();
    },

    displayGrid: function() {
      var _this = this;
      this.grid = new NsGrid({
        pagingServerSide: false,
        columns: this.cols,
        pageSize: 20,
        com: this.com,
        url: config.coreUrl + 'sensors/' + this.type_ + '/uncheckedDatas',
        rowClicked: true,
        totalElement: 'totalEntriesType',
        idCell: 'FK_Sensor'
      });

      this.grid.rowClicked = function(args) {
        if (_this.type_ != 'rfid')
        _this.rowClicked(args);
      };

      this.ui.grid.html(this.grid.displayGrid());
      this.ui.paginator.html(this.grid.displayPaginator());
    },

    rowClicked: function(args) {
      if( this.type_ === "camtrap") {
        // console.log("on a clique sur la row");
        // console.log(args);
        // console.log("on va lancer la vue details pour les camera trap");
        var row = args.row;
        var evt = args.evt;

        if (!$(evt.target).is('input')) {
          this.rgDetail.show(new LytCamTrapValidateDetail({
            type: this.type_,
            frequency: this.frequency,
            parentGrid: this.grid.collection.fullCollection,
            model: row.model,
            globalGrid: this.grid
          }));
          this.grid.currentRow = row;
          this.grid.upRowStyle();

          this.ui.detail.removeClass('hidden');
        }

      }
      else {
        var row = args.row;
        var evt = args.evt;

        if (!$(evt.target).is('input')) {
          this.rgDetail.show(new LytSensorValidateDetail({
            type: this.type_,
            frequency: this.frequency,
            parentGrid: this.grid.collection.fullCollection,
            model: row.model,
            globalGrid: this.grid
          }));
          this.grid.currentRow = row;
          this.grid.upRowStyle();

          this.ui.detail.removeClass('hidden');
        }
      }
    },

    autoValidate: function() {
      var params = {
        'frequency': this.frequency,
        'toValidate': []
      };
      var tmp = {};
      if (!this.grid.grid.getSelectedModels().length) {
        return;
      }

      if (this.type_ == 'rfid') {
        _.each(this.grid.grid.getSelectedModels(), function(model) {
          params.toValidate.push({
            'equipID': model.get('equipID'),
            'FK_Sensor': model.get('FK_Sensor')
          });
        });
      }else {
        _.each(this.grid.grid.getSelectedModels(), function(model) {
          params.toValidate.push({
            'FK_Individual': model.get('FK_Individual'),
            'FK_ptt': model.get('FK_ptt')
          });
        });
      }

      if (params.toValidate.length == this.grid.collection.state.totalRecords) {
        params.toValidate = 'all';
      }
      params.toValidate = JSON.stringify(params.toValidate);
      var url = config.coreUrl + 'sensors/' + this.type_ + '/uncheckedDatas';
      $.ajax({
        url: url,
        method: 'POST',
        data : params,
        context: this
      }).done(function(resp) {
        var msg = new Object();
        msg.title='Succes';
        msg.resp = resp;
        this.swal(msg, 'success');
        this.displayGrid();
      }).fail(function(resp) {
        var msg = new Object();
        msg.title='Succes';
        msg.resp = resp;
        this.swal(msg, 'error');
      });
    },

    swal: function(opt, type){
      var btnColor;
      switch(type){
        case 'success':
          btnColor = 'green';
          break;
        case 'error':
          btnColor = 'rgb(147, 14, 14)';
          break;
        case 'warning':
          btnColor = 'orange';
          break;
        default:
          return;
          break;
      }
      Swal({
        heightAuto: false,
        title: opt.title || 'error',
        text: JSON.stringify(opt.resp)|| '',
        type: type,
        //timer: 2000,
        showCancelButton: false,
        confirmButtonColor: btnColor,
        confirmButtonText: 'OK',
        closeOnConfirm: true,
      });
    },

  });
});
