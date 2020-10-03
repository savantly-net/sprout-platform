import { PanelPlugin } from '@savantly/sprout-api';
import { WelcomeBanner } from './Welcome';

export const plugin = new PanelPlugin(WelcomeBanner).setNoPadding();
