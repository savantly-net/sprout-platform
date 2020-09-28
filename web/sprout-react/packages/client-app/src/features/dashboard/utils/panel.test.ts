import { PanelProps } from '@savantly/sprout-api';
import { calculateInnerPanelHeight } from './panel';
import { PanelModel } from '../state';
import { getPanelPlugin } from '../../plugins/__mocks__/pluginMocks';
import { ComponentClass } from 'react';


describe('applyPanelDimensions', () => {

  it('Calculate panel height', () => {
    const panelModel = new PanelModel({});
    const height = calculateInnerPanelHeight(panelModel, 100);

    expect(height).toBe(82);
  });

  it('Calculate panel height with panel plugin zeroChromePadding', () => {
    const panelModel = new PanelModel({});
    panelModel.pluginLoaded(
      getPanelPlugin({ id: 'table' }, (null as unknown) as ComponentClass<PanelProps>, null).setNoPadding()
    );

    const height = calculateInnerPanelHeight(panelModel, 100);
    expect(height).toBe(98);
  });
});
