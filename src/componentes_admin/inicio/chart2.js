import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../_global/title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('20/12', 0),
  createData('25/12', 400),
  createData('30/12', 500),
  createData('05/01', 900),
  createData('10/01', 1400),
  createData('15/01', 2000),
  createData('20/01', 2250),
  createData('25/01', 2800),
  createData('30/01', undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Temporada</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Ingresos ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}