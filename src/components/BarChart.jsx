import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';

const BarChart = (dataS) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <ResponsiveBar
            data={dataS.data}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                            fontSize: 20,
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                            fontSize: 20,
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                        fontSize: 20,
                    },
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
            keys={['count']}
            indexBy="region"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={[
                '#66C2A5',
                '#FC8D62',
                '#8DA0CB',
                '#E78AC3',
                '#A6D854',
                '#FFD92F',
                '#E5C494',
            ]}
            colorBy="index"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', '1.6']],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'region', // changed
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count', // changed
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            role="application"
            barAriaLabel={function (e) {
                return (
                    e.region +
                    ': ' +
                    e.formattedValue +
                    ' in country: ' +
                    e.indexValue
                );
            }}
        />
    );
};

export default BarChart;
