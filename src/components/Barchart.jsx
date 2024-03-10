import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const Barchart = ({ data, title }) => {
    const ref = useRef();

    useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 400 - margin.left - margin.right,
            height = 340 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
            .select(ref.current)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Parse the Data
        d3.csv(data).then(function (data) {
            const fluff = d3.rollup(
                data,
                (v) => v.length,
                (d) => d.Region
            );
            console.log(fluff);
            const arr = [...fluff].map(([region, count]) => ({
                region,
                count,
            }));
            arr.sort((a, b) => {
                if (a.region < b.region) {
                    return -1;
                }
                if (a.region > b.region) {
                    return 1;
                }
                return 0;
            });
            // X axis
            const x = d3
                .scaleBand()
                .range([0, width])
                .domain(arr.map((d) => d.region))
                .padding(0.2);
            svg.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'translate(-10,0)rotate(-45)')
                .style('text-anchor', 'end');

            // Add Y axis
            const y = d3
                .scaleLinear()
                .domain([0, d3.max(arr, (d) => d.count)])
                .range([height, 0]);
            svg.append('g').call(d3.axisLeft(y));

            // Bars
            svg.selectAll('mybar')
                .data(arr)
                .join('rect')
                .attr('x', (d) => x(d.region))
                .attr('y', (d) => y(d.count))
                .attr('width', x.bandwidth())
                .attr('height', (d) => height - y(d.count))
                .attr('fill', '#5f0f40');
        });
    }, []);

    return <svg width={460} height={400} id="barchart" ref={ref} />;
};

export default Barchart;
