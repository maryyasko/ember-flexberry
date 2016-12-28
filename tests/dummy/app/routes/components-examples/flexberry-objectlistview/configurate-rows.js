import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
import ListFormRoute from 'ember-flexberry/routes/list-form';

export default ListFormRoute.extend({
  /**
    Name of model projection to be used as record's properties limitation.

    @property modelProjection
    @type String
    @default 'SuggestionL'
   */
  modelProjection: 'SuggestionL',

  /**
  developerUserSettings.
  {
  <componentName>: {
    <settingName>: {
        colsOrder: [ { propName :<colName>, hide: true|false }, ... ],
        sorting: [{ propName: <colName>, direction: "asc"|"desc" }, ... ],
        colsWidths: [ <colName>:<colWidth>, ... ],
      },
      ...
    },
    ...
  }
  For default userSetting use empty name ('').
  <componentName> may contain any of properties: colsOrder, sorting, colsWidth or being empty.

  @property developerUserSettings
  @type Object
  @default {}
  */
  developerUserSettings: { FOLVSettingExampleObjectListView: { } },

  /**
    Name of model to be used as list's records types.

    @property modelName
    @type String
    @default 'ember-flexberry-dummy-suggestion'
   */
  modelName: 'ember-flexberry-dummy-suggestion',

  beforeModel(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let store = this.get('store');

      let query = new Query.Builder(store)
        .from('ember-flexberry-dummy-suggestion')
        .top(1)
        .selectByProjection('SuggestionL');

      store.query('ember-flexberry-dummy-suggestion', query.build()).then((suggestion) => {
        let suggestionArr = suggestion.toArray();
        this.set('configurateRowByAddress', suggestionArr.objectAt(0).get('address'));
        resolve(this._super(...arguments));
      });
    });
  },

  /**
    Load strings coloring condition in settigs.

    @method setupController
   */
  setupController() {
    this._super(...arguments);

    this.set('controller.configurateRowByAddress', this.get('configurateRowByAddress'));
  }
});
