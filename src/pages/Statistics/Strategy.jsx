import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';

const StrategyPerformance = () => {
  const { t } = useTranslation('stats');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('3m');
  const [showFullTable, setShowFullTable] = useState(false);

  // Generate mock data for the last 12 months
  useEffect(() => {
    const generateData = () => {
      setIsLoading(true);
      
      const today = new Date();
      const result = [];
      
      // Generate data for the last 365 days
      for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const dateStr = date.toISOString().split('T')[0];
        const prev = result[result.length - 1] || {
          strategy: 0,
          SPY: 0,
          QQQ: 0,
          DIA: 0,
          IWM: 0
        };
        
        result.push({
          date: dateStr,
          strategy: parseFloat((prev.strategy + (Math.random() * 0.8 - 0.3)).toFixed(2)),
          SPY: parseFloat((prev.SPY + (Math.random() * 0.5 - 0.2)).toFixed(2)),
          QQQ: parseFloat((prev.QQQ + (Math.random() * 0.6 - 0.25)).toFixed(2)),
          DIA: parseFloat((prev.DIA + (Math.random() * 0.4 - 0.15)).toFixed(2)),
          IWM: parseFloat((prev.IWM + (Math.random() * 0.3 - 0.1)).toFixed(2)),
        });
      }
      
      setData(result);
      setIsLoading(false);
    };

    generateData();
  }, []);

  // Format date according to locale
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU');
  };

  // Format percentage values with color coding
  const formatPercentage = (value) => {
    return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
  };

  // Determine text color based on value
  const getValueColor = (value) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    
    if (timeRange === 'all') return data;
    
    const today = new Date();
    const cutoffDate = new Date(today);
    
    switch (timeRange) {
      case '1m': cutoffDate.setMonth(cutoffDate.getMonth() - 1); break;
      case '3m': cutoffDate.setMonth(cutoffDate.getMonth() - 3); break;
      case '6m': cutoffDate.setMonth(cutoffDate.getMonth() - 6); break;
      case '1y': cutoffDate.setFullYear(cutoffDate.getFullYear() - 1); break;
      default: cutoffDate.setMonth(cutoffDate.getMonth() - 3); break;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [data, timeRange]);

  // Calculate cumulative returns for the filtered data
  const calculateCumulativeReturns = useMemo(() => {
    if (filteredData.length === 0) return {};

    const last = filteredData[filteredData.length - 1];
    const first = filteredData[0];
    
    return {
      strategy: ((last.strategy - first.strategy) / Math.abs(first.strategy || 1)) * 100,
      SPY: ((last.SPY - first.SPY) / Math.abs(first.SPY || 1)) * 100,
      QQQ: ((last.QQQ - first.QQQ) / Math.abs(first.QQQ || 1)) * 100,
      DIA: ((last.DIA - first.DIA) / Math.abs(first.DIA || 1)) * 100,
      IWM: ((last.IWM - first.IWM) / Math.abs(first.IWM || 1)) * 100,
    };
  }, [filteredData]);

  // Prepare chart data for Plotly
  const chartData = useMemo(() => {
    return [
      {
        name: t('strategy'),
        x: filteredData.map(item => item.date),
        y: filteredData.map(item => item.strategy),
        type: 'scatter',
        mode: 'lines',
        line: { color: '#00BFFF', width: 3 },
        hoverinfo: 'x+y',
        hovertemplate: '%{x}<br>%{y:.2f}%<extra></extra>',
      },
      {
        name: 'SPY',
        x: filteredData.map(item => item.date),
        y: filteredData.map(item => item.SPY),
        type: 'scatter',
        mode: 'lines',
        line: { color: '#6C757D', width: 2, dash: 'dot' },
        hoverinfo: 'x+y',
        hovertemplate: '%{x}<br>%{y:.2f}%<extra></extra>',
      },
      {
        name: 'QQQ',
        x: filteredData.map(item => item.date),
        y: filteredData.map(item => item.QQQ),
        type: 'scatter',
        mode: 'lines',
        line: { color: '#6C757D', width: 2, dash: 'dash' },
        hoverinfo: 'x+y',
        hovertemplate: '%{x}<br>%{y:.2f}%<extra></extra>',
      },
      {
        name: 'DIA',
        x: filteredData.map(item => item.date),
        y: filteredData.map(item => item.DIA),
        type: 'scatter',
        mode: 'lines',
        line: { color: '#6C757D', width: 2, dash: 'longdash' },
        hoverinfo: 'x+y',
        hovertemplate: '%{x}<br>%{y:.2f}%<extra></extra>',
      },
      {
        name: 'IWM',
        x: filteredData.map(item => item.date),
        y: filteredData.map(item => item.IWM),
        type: 'scatter',
        mode: 'lines',
        line: { color: '#6C757D', width: 2, dash: 'dashdot' },
        hoverinfo: 'x+y',
        hovertemplate: '%{x}<br>%{y:.2f}%<extra></extra>',
      },
    ];
  }, [filteredData, t]);

  // Chart layout configuration
  const chartLayout = useMemo(() => ({
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    font: { color: '#FFFFFF' },
    xaxis: {
      gridcolor: 'rgba(108, 117, 125, 0.3)',
      tickformat: '%d.%m.%Y',
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      gridcolor: 'rgba(108, 117, 125, 0.3)',
      tickformat: '.2f%',
      showgrid: true,
      zeroline: false,
    },
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: 1.02,
      xanchor: 'right',
      x: 1,
      font: { size: 12 },
    },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    hovermode: 'x unified',
    hoverlabel: {
      bgcolor: '#0A1F44',
      bordercolor: '#00BFFF',
      font: { color: '#FFFFFF' },
    },
    showlegend: true,
  }), []);

  // Table data to display (either limited or full)
  const tableData = useMemo(() => {
    return showFullTable ? filteredData : filteredData.slice(0, 10);
  }, [filteredData, showFullTable]);

  return (
    <div className="min-h-screen bg-dark-blue text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t('performanceTitle')}</h1>
          <p className="text-graphite">{t('performanceSubtitle')}</p>
        </div>

        {/* Main Card */}
        <div className="bg-dark-blue border border-electric-blue rounded-lg p-4 sm:p-6 mb-8 shadow-lg">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
            </div>
          ) : (
            <>
              {/* Chart Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
  <h2 className="text-xl font-semibold">{t('performanceChart')}</h2>
  <div 
    className="inline-flex rounded-md shadow-sm bg-dark-blue border border-graphite p-1"
    role="group"
    aria-label="Выбор временного диапазона"
  >
    {['1m', '3m', '6m', '1y', 'all'].map((range, index) => (
      <button
        key={range}
        onClick={() => setTimeRange(range)}
        aria-current={timeRange === range ? "true" : "false"}
        aria-label={`Показать данные за ${t(`timeRanges.${range}`)}`}
        className={`relative px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue transition-all duration-300 ease-in-out overflow-hidden group ${
          timeRange === range
            ? 'bg-electric-blue text-white shadow-md'
            : 'bg-dark-blue text-graphite'
        } ${
          index === 0 ? 'rounded-l-md' : 
          index === ['1m', '3m', '6m', '1y', 'all'].length - 1 ? 'rounded-r-md' : 
          'border-l border-r border-gray-600'
        }`}
      >
        {/* Эффект подчеркивания при наведении */}
        <span className="relative z-10">{t(`timeRanges.${range}`)}</span>
        
        {timeRange !== range && (
          <>
            {/* Эффект фона при наведении */}
            <span className="absolute inset-0 bg-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Эффект подчеркивания */}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-electric-blue group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></span>
            
            {/* Эффект "пульсации" при наведении */}
            <span className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-electric-blue/20 rounded-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
          </>
        )}
      </button>
    ))}
  </div>
</div>

              {/* Performance Summary Cards - Now shows returns for selected period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <div className="bg-dark-blue border border-electric-blue p-3 rounded-lg">
                  <p className="text-graphite text-sm">{t('strategy')}</p>
                  <p className={`text-xl font-semibold ${getValueColor(calculateCumulativeReturns.strategy)}`}>
                    {formatPercentage(calculateCumulativeReturns.strategy)}
                  </p>
                  <p className="text-xs text-graphite mt-1">
                    {t('selectedPeriod')}
                  </p>
                </div>
                {['SPY', 'QQQ', 'DIA', 'IWM'].map(benchmark => (
                  <div key={benchmark} className="bg-dark-blue border border-graphite p-3 rounded-lg">
                    <p className="text-graphite text-sm">{benchmark}</p>
                    <p className={`text-xl font-semibold ${getValueColor(calculateCumulativeReturns[benchmark])}`}>
                      {formatPercentage(calculateCumulativeReturns[benchmark])}
                    </p>
                    <p className="text-xs text-graphite mt-1">
                      {t('selectedPeriod')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart Container */}
              <div className="h-80 sm:h-96 mb-8">
                <Plot
                  data={chartData}
                  layout={chartLayout}
                  config={{
                    displayModeBar: true,
                    responsive: true,
                    displaylogo: false,
                    modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'hoverCompareCartesian'],
                  }}
                  useResizeHandler={true}
                  className="w-full h-full"
                />
              </div>

              {/* Table Section - Now shows data matching the chart */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {t('performanceTable')} ({t(`timeRanges.${timeRange}`)})
                  </h2>
                  <button
                    onClick={() => setShowFullTable(!showFullTable)}
                    className="text-electric-blue text-sm hover:underline"
                  >
                    {showFullTable ? t('showLess') : t('showMore')}
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-graphite">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-graphite">{t('date')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-electric-blue">{t('strategy')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-graphite">SPY</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-graphite">QQQ</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-graphite">DIA</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-graphite">IWM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-graphite">
                      {tableData.map((row, index) => (
                        <tr key={index} className="hover:bg-opacity-10 hover:bg-electric-blue transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(row.date)}</td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${getValueColor(row.strategy)}`}>
                            {formatPercentage(row.strategy)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${getValueColor(row.SPY)}`}>
                            {formatPercentage(row.SPY)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${getValueColor(row.QQQ)}`}>
                            {formatPercentage(row.QQQ)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${getValueColor(row.DIA)}`}>
                            {formatPercentage(row.DIA)}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${getValueColor(row.IWM)}`}>
                            {formatPercentage(row.IWM)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Disclaimer Section */}
        <div className="bg-dark-blue border border-graphite rounded-lg p-4 sm:p-6">
          <p className="text-sm text-graphite italic">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrategyPerformance;