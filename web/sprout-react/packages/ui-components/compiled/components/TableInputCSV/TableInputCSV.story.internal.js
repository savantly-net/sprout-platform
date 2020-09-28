import React from 'react';
import TableInputCSV from './TableInputCSV';
import { action } from '@storybook/addon-actions';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
export default {
    title: 'Forms/TableInputCSV',
    component: TableInputCSV,
    decorators: [withCenteredStory],
};
export var basic = function () {
    return (React.createElement(TableInputCSV, { width: 400, height: '90vh', text: 'a,b,c\n1,2,3', onSeriesParsed: function (data, text) {
            action('Data')(data, text);
        } }));
};
//# sourceMappingURL=TableInputCSV.story.internal.js.map