import { ResponsiveBar } from '@nivo/bar'

const SentimentBarGraph = (props) => {

    const { data, layout, legend} = props;

    return (
        <div style={{width:"100%"}}>
        <ResponsiveBar
            data={[data]}
            keys={['Negative', 'Neutral', 'Positive']}
            layout= {layout}
            margin={{top: 10, right: 100, bottom: 20, left: 60 }}
            padding={0.1}
            innerPadding={20}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true,  }}
            colors={{ scheme: "pastel1" }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize:0,
                legend: 'sentiment',
                legendPosition: 'middle',
                legendOffset: 15
            }}
            axisLeft={{
                tickSize: 0,
                legend:legend,
                legendPosition: 'middle',
                legendOffset: -45
            }}
            label={(d) =>
                d.value === 0 ? <tspan y="-15">{d.value}</tspan> : d.value
              }     
            labelSkipWidth={16}
            labelSkipHeight={16}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 95,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 10,
                }
            ]}
            isInteractive={false}
        />
        </div>
    )
    }

export default SentimentBarGraph;