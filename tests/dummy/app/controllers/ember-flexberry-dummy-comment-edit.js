import DetailEditFormController from 'ember-flexberry/controllers/detail-edit-form';

export default DetailEditFormController.extend({
  /**
   * Method to get type and attributes of a component,
   * which will be embeded in object-list-view cell.
   *
   * @method getCellComponent.
   * @param {Object} attr Attribute of projection property related to current table cell.
   * @param {String} bindingPath Path to model property related to current table cell.
   * @param {DS.Model} modelClass Model class of data record related to current table row.
   * @return {Object} Object containing name & properties of component, which will be used to render current table cell.
   * { componentName: 'my-component',  componentProperties: { ... } }.
   */
  getCellComponent: function(attr, bindingPath, model) {
    var cellComponent = this._super(...arguments);

    if (attr.kind === 'belongsTo') {
      if (model.modelName === 'ember-flexberry-dummy-comment-vote' && bindingPath === 'applicationUser') {
        cellComponent.componentProperties = {
          projection: 'ApplicationUserL',
          displayAttributeName: 'name',
          title: 'Application user',
          relationName: 'applicationUser',
          choose: 'showLookupDialog',
          remove: 'removeLookupValue'
        };
      }
    }

    return cellComponent;
  }
});
