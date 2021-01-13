import { PanelPlugin } from '@savantly/sprout-api';
import { PostsPanel } from './PostsPanel';
import { PostsPanelOptions } from './types';

export const plugin = new PanelPlugin<PostsPanelOptions>(PostsPanel);
