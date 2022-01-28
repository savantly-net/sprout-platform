import { renderMarkdown } from '@savantly/sprout-api';
/* eslint-disable */
import React, { PureComponent } from 'react';
/* eslint-enable */
import { sproutApiSvc } from '../../services/sproutApiSvc';

interface Props {
  plugin: {
    name: string;
    id: string;
  };
  type: string;
}

interface State {
  isError: boolean;
  isLoading: boolean;
  help: string;
}

export class PluginHelp extends PureComponent<Props, State> {
  state = {
    isError: false,
    isLoading: false,
    help: ''
  };

  componentDidMount(): void {
    this.loadHelp();
  }

  constructPlaceholderInfo() {
    return 'No plugin help or readme markdown file was found';
  }

  loadHelp = () => {
    const { plugin, type } = this.props;
    this.setState({ isLoading: true });

    sproutApiSvc
      .get<string>(`/api/plugins/${plugin.id}/markdown/${type}`)
      .then((response) => {
        const helpHtml = renderMarkdown(response.data);

        if (response.data === '' && type === 'help') {
          this.setState({
            isError: false,
            isLoading: false,
            help: this.constructPlaceholderInfo()
          });
        } else {
          this.setState({
            isError: false,
            isLoading: false,
            help: helpHtml
          });
        }
      })
      .catch(() => {
        this.setState({
          isError: true,
          isLoading: false
        });
      });
  };

  render() {
    const { type } = this.props;
    const { isError, isLoading, help } = this.state;

    if (isLoading) {
      return <h2>Loading help...</h2>;
    }

    if (isError) {
      return <h3>'Error occurred when loading help'</h3>;
    }

    if (type === 'panel_help' && help === '') {
    }

    return <div className="markdown-html" dangerouslySetInnerHTML={{ __html: help }} />;
  }
}
