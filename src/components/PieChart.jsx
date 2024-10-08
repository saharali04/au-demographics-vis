import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';

const PieChart = (data) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMap = {
        CENTRAL: '#66C2A5',
        NE: '#FC8D62',
        WEST: '#FFD92F',
        MW: '#A6D854',
        SW: '#E78AC3',
        SE: '#8DA0CB',
        FL: '#E5C494',
    };
    const getColor = (bar) => colorMap[bar.id];
    const format = (v) => `${v}%`;
    return (
        <ResponsivePie
            data={data.data}
            id={'region'}
            value={'percentage'}
            sortByValue={true}
            valueFormat={'>-.0%'}
            colors={(bar) => console.log(bar) || getColor(bar)}
            theme={{
                labels: {
                    text: {
                        fontSize: 20,
                    },
                },
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                        fontSize: 20,
                    },
                    spacing: 5,
                },
                tooltip: {
                    container: {
                        background: 'black',
                        color: 'red',
                        fontSize: 20,
                        'font-family': 'sans-serif',
                        padding: 2,
                        'border-radius': 8,
                    },
                    basic: {
                        whiteSpace: 'pre',
                        display: 'flex',
                        'flex-direction': 'row',
                        alignItems: 'center',
                        'justify-content': 'center',
                        background: 'black',
                        margin: 3,
                        padding: 8,
                        height: 40,
                        color: 'white',
                    },
                },
            }}
            margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 0.2]],
            }}
            tooltipFormat={format}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsRadiusOffset={0.4}
            arcLabelsSkipAngle={7}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: 56,
                    itemsSpacing: 15,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: colors.grey[100],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default PieChart;
