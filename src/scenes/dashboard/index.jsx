import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import PieChart from '../../components/PieChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WcIcon from '@mui/icons-material/Wc';

const Dashboard = (data) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [currData, setCurrData] = useState(data.data[0]);
    const [largeRegionPercentage, setLargeRegionPercentage] = useState();
    const [smallRegionPercentage, setSmallRegionPercentage] = useState();
    const [totalCount, setTotalCount] = useState();
    const [selectedValue, setSelectedValue] = useState(0);
    const subtitleMap = new Map([
        [0, 'Goal Demographics'],
        [1, 'All Applicant Demographics'],
        [2, 'Camp 1 Demographics'],
        [3, 'Camp 2 Demographics'],
    ]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setCurrData(data.data[event.target.value]);
        setSubtitle(subtitleMap.get(event.target.value));
    };

    useEffect(() => {
        setLargeRegionPercentage(getRegionPercentage(['SW', 'SE', 'CENTRAL']));
        setSmallRegionPercentage(
            getRegionPercentage(['FL', 'MW', 'NE', 'WEST'])
        );
        setTotalCount(getTotalCount());
    }, [currData]);

    function getRegionPercentage(regionList) {
        return currData.reduce((total, curr) => {
            if (regionList.includes(curr.region))
                total += curr.percentage * 100;
            return Math.round(total, 6);
        }, 0);
    }

    function getTotalCount() {
        return currData.reduce((total, curr) => {
            return (total += curr.count);
        }, 0);
    }

    const [subtitle, setSubtitle] = useState('Goal Demographics');
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                flexDirection={'row'}
            >
                <Header title="PARTICIPANT DASHBOARD" subtitle={subtitle} />
                <FormControl style={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Data</InputLabel>
                    <Select
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Data"
                        onChange={handleChange}
                        defaultValue={0}
                    >
                        <MenuItem value={0}>Goal Demographics</MenuItem>
                        <MenuItem value={1}>All Applicants</MenuItem>
                        <MenuItem value={2}>Camp 1</MenuItem>
                        <MenuItem value={3}>Camp 2</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* GRID & CHARTS */}
            {subtitle !== 'Goal Demographics' ? (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    {/* ROW 1 */}
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={totalCount}
                            subtitle={
                                subtitle != 'All Applicant Demographics'
                                    ? 'Total Participants'
                                    : 'Total Applicants'
                            }
                            progress="1.0"
                            icon={
                                <GroupsIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={largeRegionPercentage + '%'}
                            subtitle="Central + SW + SE"
                            progress={largeRegionPercentage / 100}
                            icon={
                                <PeopleAltIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={smallRegionPercentage + '%'}
                            subtitle="FL + MW + NE + WEST"
                            progress={smallRegionPercentage / 100}
                            icon={
                                <PeopleAltIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>

                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={
                                Math.round(
                                    data.data[selectedValue + 3][0].percentage *
                                        100
                                ) +
                                ' : ' +
                                Math.round(
                                    data.data[selectedValue + 3][1].percentage *
                                        100
                                )
                            }
                            subtitle="Male : Female"
                            progress={
                                data.data[selectedValue + 3][0].percentage
                            }
                            icon={
                                <WcIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>
                    {/* ROW 2 */}
                    <Box
                        gridColumn="span 8"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                    >
                        <PieChart data={currData} />
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        overflow="auto"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                color={colors.grey[100]}
                                variant="h5"
                                fontWeight="600"
                            >
                                Region
                            </Typography>
                            <Typography
                                color={colors.grey[100]}
                                variant="h5"
                                fontWeight="600"
                            >
                                Count
                            </Typography>
                        </Box>
                        {currData.map((item, i) => (
                            <Box
                                key={`${item.region}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="11px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {item.region}
                                    </Typography>
                                </Box>

                                <Box
                                    backgroundColor={colors.greenAccent[500]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    {item.count}
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    {/* ROW 3 */}
                    <Box
                        gridColumn="span 12"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        alignSelf={'center'}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex "
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    fontWeight="600"
                                    color={colors.grey[100]}
                                >
                                    {subtitle != 'All Applicant Demographics'
                                        ? 'Participants'
                                        : 'Applicants'}{' '}
                                    By Region
                                </Typography>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    color={colors.greenAccent[500]}
                                >
                                    {totalCount}{' '}
                                    {subtitle != 'All Applicant Demographics'
                                        ? 'Participants'
                                        : 'Applicants'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box height="400px" m="0 0 0 0">
                            <BarChart data={currData} />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    <Box
                        gridColumn="span 6"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={largeRegionPercentage + '%'}
                            subtitle="Central + SW + SE"
                            progress={largeRegionPercentage / 100}
                            icon={
                                <PeopleAltIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 6"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title={smallRegionPercentage + '%'}
                            subtitle="FL + MW + NE + WEST"
                            progress={smallRegionPercentage / 100}
                            icon={
                                <PeopleAltIcon
                                    sx={{
                                        color: colors.greenAccent[600],
                                        fontSize: '26px',
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box
                        gridColumn="span 8"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                    >
                        <PieChart data={currData} />
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
                        overflow="auto"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                color={colors.grey[100]}
                                variant="h5"
                                fontWeight="600"
                            >
                                Region
                            </Typography>
                            <Typography
                                color={colors.grey[100]}
                                variant="h5"
                                fontWeight="600"
                            >
                                Percentage
                            </Typography>
                        </Box>
                        {currData.map((item, i) => (
                            <Box
                                key={`${item.region}-${i}`}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom={`4px solid ${colors.primary[500]}`}
                                p="11px"
                            >
                                <Box>
                                    <Typography
                                        color={colors.greenAccent[500]}
                                        variant="h5"
                                        fontWeight="600"
                                    >
                                        {item.region}
                                    </Typography>
                                </Box>

                                <Box
                                    backgroundColor={colors.greenAccent[500]}
                                    p="5px 10px"
                                    borderRadius="4px"
                                >
                                    {Math.round(item.percentage * 100) + '%'}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;