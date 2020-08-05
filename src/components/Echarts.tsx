import React, { Component } from 'react';
import ReactEcharts from "echarts-for-react";

interface Props {
    option: any;
    height?: number;
}

class EchartsTest extends Component<Props> {
    render() {
        const { option, height } = this.props;
        return (
            <div className="react_echart">
                <ReactEcharts
                    option={option}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    style={{ height: height ? height: 500, width: '100%' }}
                />
            </div>


        )
    }
}

export default EchartsTest;