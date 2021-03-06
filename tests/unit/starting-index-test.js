import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForView from '../helpers/module-for-view';
import {compile, generateContent, sortElementsByPosition, itemPositions} from '../helpers/helpers';

import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';
import ReusableListItemView from 'ember-list-view/reusable-list-item-view';

moduleForView('list-view', 'startingIndex', {});

test("base case", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 0
    });
  });

  assert.equal(view._startingIndex(), 0);
});

test("scroll but within content length", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 100
    });
  });

  assert.equal(view._startingIndex(), 0);
});

test("scroll but beyond content length", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 1000
    });
  });

  assert.equal(view._startingIndex(), 0);
});


test("larger list", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  // 2x2 grid
  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(50),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 1000
    });
  });

  assert.equal(view._startingIndex(), 28);
});

test("larger list", function(assert){
  var height = 200, rowHeight = 100, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(40),
      width: width,
      elementWidth: width,
      scrollTop: 100
    });
  });

  assert.equal(view._startingIndex(), 1);
});

