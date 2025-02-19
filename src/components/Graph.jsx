import React, { useEffect, useState, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import { Slot } from "@radix-ui/react-slot";
import Plot from "react-plotly.js";
import Footer from "../components/Footer";
import Header from "../components/Header"

// ---- Minimal computations for RSI, MACD, Bollinger ----
function computeSMA(data, period) {
  const sma = new Array(data.length).fill(NaN);
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const avg = slice.reduce((acc, val) => acc + val, 0) / period;
    sma[i] = avg;
  }
  return sma;
}

function computeEMA(data, period) {
  const k = 2 / (period + 1);
  const ema = new Array(data.length).fill(NaN);
  if (data.length < period) return ema;

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i];
  }
  let prevEMA = sum / period;
  ema[period - 1] = prevEMA;

  for (let i = period; i < data.length; i++) {
    const val = data[i];
    prevEMA = (val - prevEMA) * k + prevEMA;
    ema[i] = prevEMA;
  }
  return ema;
}

function computeRSI(closes, period = 14) {
  if (closes.length < period) {
    return new Array(closes.length).fill(NaN);
  }
  const rsi = new Array(closes.length).fill(NaN);
  let sumGain = 0;
  let sumLoss = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) sumGain += diff;
    else sumLoss += Math.abs(diff);
  }
  let avgGain = sumGain / period;
  let avgLoss = sumLoss / period;
  const firstRSI = 100 - 100 / (1 + avgGain / avgLoss);
  rsi[period] = firstRSI;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? Math.abs(diff) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    const rs = avgLoss === 0 ? 0 : avgGain / avgLoss;
    rsi[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + rs);
  }

  return rsi;
}

function computeMACD(closes, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const emaFast = computeEMA(closes, fastPeriod);
  const emaSlow = computeEMA(closes, slowPeriod);

  const macdLine = closes.map((_, i) => {
    if (isNaN(emaFast[i]) || isNaN(emaSlow[i])) return NaN;
    return emaFast[i] - emaSlow[i];
  });

  const signalLine = computeEMA(macdLine, signalPeriod);
  const histogram = macdLine.map((val, i) => val - signalLine[i]);

  return { macdLine, signalLine, histogram };
}

function computeBollingerBands(closes, period = 20, stdDevMultiplier = 2) {
  const sma = computeSMA(closes, period);
  const upper = new Array(closes.length).fill(NaN);
  const lower = new Array(closes.length).fill(NaN);

  for (let i = 0; i < closes.length; i++) {
    if (i < period - 1) continue;
    const slice = closes.slice(i - period + 1, i + 1);
    const avg = sma[i];
    let variance = 0;
    for (let j = 0; j < slice.length; j++) {
      variance += (slice[j] - avg) ** 2;
    }
    variance /= period;
    const stdev = Math.sqrt(variance);
    upper[i] = avg + stdDevMultiplier * stdev;
    lower[i] = avg - stdDevMultiplier * stdev;
  }

  return { upper, lower };
}

// ---- Random text generator referencing lines only ----
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// [ same createRandomParagraph() function from your snippet, with synonyms etc. ]

function createRandomParagraph(lines, direction) {
  const synonymsLines = [
    "price trajectories", 
    "trend pathways", 
    "support and resistance vectors", 
    "technical alignment segments", 
    "market contour outlines", 
    "liquidity flow traces", 
    "regression channel guides", 
    "volatility bands",
    "candlestick pattern formations",
    "relative strength index (RSI) zones",
    "pivot point projections",
    "Elliott Wave cycle counts",
    "harmonic pattern structures",
    "VWAP convergence channels",
    "Ichimoku cloud baselines",
    "Gann fan alignment levels",
    "moving average convergence-divergence (MACD) tracks",
    "Keltner channel boundaries",
    "trend exhaustion markers",
    "price action compression zones"
  ];
  
  const synonymsUndershoot = [
    "fail to breach critical Fibonacci retracement zones", 
    "hover below key exponential moving averages", 
    "remain suppressed under long-term moving averages", 
    "lag beneath institutional order blocks", 
    "trade under volume-weighted average price levels", 
    "underperform relative to historical volatility expectations",
    "drift below dynamic support thresholds",
    "persist beneath descending trendline resistance",
    "fail to maintain breakout confirmations",
    "slip under key liquidity distribution zones",
    "consolidate under the lower boundary of Bollinger Bands",
    "underwhelm near fundamental fair value estimations",
    "stall below critical supply-demand imbalance levels",
    "remain trapped beneath cyclical pivot structures",
    "trade at a discount to intrinsic valuation multiples",
    "retrace deeper than expected into previous accumulation zones",
    "struggle below key gamma exposure lines",
    "lag key performance indicators for sector benchmarks",
    "hover beneath institutional liquidity clusters",
    "underperform relative to expected earnings momentum"
  ];
  
  const synonymsOvershoot = [
    "temporarily break above Bollinger Band thresholds", 
    "extend beyond anticipated liquidity pools", 
    "rise over macroeconomic pivot points", 
    "outpace fundamental valuation multiples", 
    "cross psychological round-number barriers", 
    "surge past stochastic oscillator benchmarks",
    "overextend into low-volume price nodes",
    "breach upper Ichimoku cloud resistance lines",
    "accelerate beyond the upper envelope channel",
    "overshoot Fibonacci extension targets",
    "spike above implied volatility curves",
    "test illiquid price gaps without support",
    "exceed regression trendline projections",
    "penetrate critical delta imbalance points",
    "trade at a premium to historical valuation bands",
    "extend beyond standard deviation volatility boundaries",
    "momentarily push above descending resistance arcs",
    "outpace beta-adjusted performance indices",
    "breach major gamma squeeze thresholds",
    "surge into overbought oscillator readings"
  ];
  
  const synonymsMovement = direction === "bullish"
    ? [
        "demonstrate progressive upward momentum", 
        "exhibit sustained bullish price action", 
        "continue ascending with higher highs and higher lows", 
        "show resilience in an upward breakout trajectory", 
        "reflect momentum-driven buying pressure leading to price escalation",
        "confirm bullish reversal patterns with expanding volume profiles",
        "align with risk-on capital rotations across multiple sectors",
        "sustain price discovery phases amid institutional accumulation",
        "maintain elevated price levels despite overbought conditions",
        "trend higher on strengthening relative performance ratios",
        "experience bullish engulfing patterns across major timeframes",
        "validate bullish divergence signals in momentum oscillators",
        "move decisively past resistance zones, confirming trend shifts",
        "reflect synchronized upward movements across correlated assets",
        "trend upward, driven by improving macroeconomic data",
        "accelerate in response to short covering rallies",
        "post consecutive gains amid risk-on trading conditions"
      ]
    : [
        "signal bearish continuation patterns", 
        "depict a retracement toward lower support levels", 
        "reflect sustained downward consolidation", 
        "illustrate prolonged distribution phases with declining volume", 
        "indicate systemic devaluation across multiple timeframes",
        "show signs of capitulation with high-volume sell-offs",
        "trend downward amid weakening market breadth",
        "confirm breakdowns from critical technical formations",
        "slip into prolonged accumulation zones with weak demand",
        "experience extended drawdowns aligned with macro risks",
        "remain under bearish pressure from broader market corrections",
        "decline sharply after failing to sustain key breakout levels",
        "reflect sector-wide derisking as global sentiment deteriorates",
        "demonstrate increased volatility amid bearish momentum",
        "confirm head-and-shoulders patterns indicating further downside",
        "trend lower following earnings misses and downward revisions",
        "reflect liquidity withdrawals from high-risk segments"
      ];
  
  const synonymsConclusion = direction === "bullish"
    ? [
        "a robust upward reversal with increasing trading volumes", 
        "an extended rally suggesting strong investor sentiment", 
        "a sustained uptrend fueled by positive macroeconomic indicators", 
        "a progressive bullish continuation supported by market breadth",
        "a pronounced bullish breakout above key resistance levels",
        "further upside potential driven by institutional accumulation",
        "positive momentum supported by macro tailwinds and liquidity influx",
        "a multi-phase rally confirming long-term structural bullishness",
        "momentum continuation as fundamental drivers align with technicals",
        "increased participation from growth-oriented investors"
      ]
    : [
        "a prolonged downtrend reflecting broader risk-off sentiment", 
        "a significant pullback due to diminishing investor confidence", 
        "an extended slump driven by fundamental weaknesses", 
        "a gradual downturn as liquidity dries up in key trading sessions",
        "an extended bearish cycle amid tightening financial conditions",
        "sustained selling pressure as key support levels break",
        "persistent downward bias driven by macroeconomic headwinds",
        "broader market weakness confirmed by declining leading indicators",
        "protracted bearish phase reflecting systemic vulnerabilities",
        "deep correction phases triggered by shifting central bank policies"
      ];
  
  const intros = [
    "Upon a comprehensive review of the complex technical structures in play, focusing on the",
    "Analyzing these intricately plotted market indicators, particularly the",
    "Scrutinizing the recently formed price frameworks and the corresponding",
    "Examining the subtle shifts within the technical overlays related to the",
    "Delving into the multi-timeframe analysis of underlying price actions, specifically the",
    "Exploring the evolving technical sentiment through the lens of the",
    "Considering the interplay between fundamental catalysts and the",
    "Assessing market behavior through overlapping trend dynamics and the"
  ];
  
  const middles = [
    `, it becomes apparent that some ${pickOne(synonymsLines)} notably ${pickOne(synonymsUndershoot)}, while simultaneously, others ${pickOne(synonymsOvershoot)}, suggesting mixed market sentiment and potential divergence in short-term trader expectations.`,
    `, one can observe that several ${pickOne(synonymsLines)} appear to ${pickOne(synonymsUndershoot)}; however, this sharply contrasts with others that ${pickOne(synonymsOvershoot)}, likely due to speculative inflows and heightened volatility pockets.`,
    `, the analysis reveals that a number of ${pickOne(synonymsLines)} clearly ${pickOne(synonymsUndershoot)}. In contrast, others ${pickOne(synonymsOvershoot)}, potentially driven by momentum-chasing behavior and algorithmic trading anomalies.`,
    `, it becomes clear that certain ${pickOne(synonymsLines)} seem to ${pickOne(synonymsUndershoot)} and critical liquidity thresholds. Meanwhile, some ${pickOne(synonymsOvershoot)}, defying conventional resistance dynamics and prompting revaluation of short-term price targets.`,
    `, detailed observations indicate that specific ${pickOne(synonymsLines)} tend to ${pickOne(synonymsUndershoot)} key pivot regions, whereas others ${pickOne(synonymsOvershoot)} as part of broader risk-on rotations fueled by institutional inflows.`
  ];
  
  const directionals = [
    `Taken together, all these factors strongly hint at the likelihood of a market that could ${pickOne(synonymsMovement)}, ultimately culminating in ${pickOne(synonymsConclusion)}.`,
    `As a result, this technical configuration suggests the potential for the market to ${pickOne(synonymsMovement)}, with ${pickOne(synonymsConclusion)} appearing increasingly probable given prevailing market conditions.`,
    `Considering the broader context, these nuanced patterns indicate that the market is poised to ${pickOne(synonymsMovement)}, pointing towards ${pickOne(synonymsConclusion)} amid shifting macroeconomic sentiment.`,
    `Collectively, these aggregated technical signals favor a scenario where the market may ${pickOne(synonymsMovement)}, reinforcing expectations for ${pickOne(synonymsConclusion)} as institutional interest resurfaces.`,
    `Ultimately, this interplay between technical and fundamental drivers suggests a path where the market will ${pickOne(synonymsMovement)}, setting the stage for ${pickOne(synonymsConclusion)} in the upcoming trading sessions.`
  ];
  

  const intro = pickOne(intros);
  const middle = pickOne(middles);
  const directional = pickOne(directionals);

  return `${intro} ${pickOne(synonymsLines)}${middle} ${directional}`;
}

async function callAiApi(lines, direction) {
  // Real usage => fetch to an AI endpoint
  // For now, we just call createRandomParagraph
  return createRandomParagraph(lines, direction);
}

// ---- Radix Button using Slot ----
function RadixButton({ children, disabled, onClick, style }) {
  return (
    <Slot>
      <button disabled={disabled} onClick={onClick} style={style}>
        {children}
      </button>
    </Slot>
  );
}

// ---- Main Chart ----
export default function GraphAllInOneNoSlider() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1h");
  const [data, setData] = useState([]);
  const [aiParagraph, setAiParagraph] = useState("");
  const [lines, setLines] = useState([]);
  const [indicatorsVisible, setIndicatorsVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const wsRef = useRef(null);

  // Clear lines, AI text, hide indicators on coin/timeframe change
  useEffect(() => {
    setLines([]);
    setAiParagraph("");
    setIndicatorsVisible(false);

    async function fetchData() {
      try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${timeframe}&limit=200`;
        const res = await fetch(url);
        const raw = await res.json();
        const candles = raw.map((c) => ({
          x: new Date(c[0]),
          open: parseFloat(c[1]),
          high: parseFloat(c[2]),
          low: parseFloat(c[3]),
          close: parseFloat(c[4]),
        }));
        setData(candles);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchData();
  }, [coin, timeframe]);

  // WebSocket for live updates
  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    const wsUrl = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}@kline_${timeframe}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket open for", coin, timeframe);

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      const k = msg.k;
      const newCandle = {
        x: new Date(k.t),
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      };

      setData((prev) => {
        if (!prev.length) return [newCandle];
        const last = prev[prev.length - 1];
        if (last.x.getTime() === newCandle.x.getTime()) {
          return [...prev.slice(0, -1), newCandle];
        } else {
          return [...prev, newCandle];
        }
      });
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = (evt) => console.warn("WebSocket closed:", evt);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [coin, timeframe]);

  // Generate lines + random text. Bollinger decides direction, no mention of it.
  async function generateRandomLinesAndAi() {
    if (data.length < 2) return;

    const lastCandle = data[data.length - 1];
    const lastT = lastCandle.x.getTime();
    const lastClose = lastCandle.close;

    // Bollinger direction
    const closes = data.map((d) => d.close);
    const { upper, lower } = computeBollingerBands(closes);
    const lastUpper = upper[upper.length - 1];
    const lastLower = lower[lower.length - 1];
    const midpoint = (lastUpper + lastLower) / 2;
    const direction = lastClose < midpoint ? "bullish" : "bearish";

    // Build lines
    const newLines = [];
    const colorOptions = ["blue", "green", "orange", "purple", "magenta", "teal", "lime", "red"];
    const N = 5;

    for (let i = 0; i < N; i++) {
      const idxHigh = Math.floor(Math.random() * data.length);
      const cHigh = data[idxHigh];
      if (!cHigh) continue;

      const x0 = cHigh.x.getTime();
      const y0 = cHigh.high;
      const lastX = lastT;

      // base slope
      const baseSlope = (lastClose - y0) / (lastX - x0 || 1);

      // random slope bias
      let randomSlopeBias = (Math.random() - 0.5) * 0.1; // ~ -0.05..+0.05
      if (direction === "bullish") {
        randomSlopeBias += 0.05; // shift up
      } else {
        randomSlopeBias -= 0.05; // shift down
      }
      const slope = baseSlope * (1 + randomSlopeBias);

      // Extend 10% beyond last candle’s time
      const offset = (lastT - x0) * 0.1;
      const extendedX = lastT + offset;
      const extendedY = y0 + slope * (extendedX - x0);

      const randColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

      newLines.push({
        type: "line",
        xref: "x",
        yref: "y",
        x0: cHigh.x,
        y0: y0,
        x1: new Date(extendedX),
        y1: extendedY,
        line: {
          color: randColor,
          width: 2,
          dash: "dot",
        },
      });
    }

    setLines(newLines);

    // AI paragraph
    const paragraph = await callAiApi(newLines, direction);
    setAiParagraph(paragraph);
  }

  function handleAnalyzeClick() {
    setIsAnalyzing(true);
    setTimeout(async () => {
      setIndicatorsVisible(true);
      await generateRandomLinesAndAi();
      setIsAnalyzing(false);
    }, 8000);
  }

  // Build Plotly data
  const xs = data.map((d) => d.x);
  const closes = data.map((d) => d.close);

  // Candlestick trace
  const candlestickTrace = {
    x: xs,
    open: data.map((d) => d.open),
    high: data.map((d) => d.high),
    low: data.map((d) => d.low),
    close: data.map((d) => d.close),
    type: "candlestick",
    xaxis: "x",
    yaxis: "y",
    name: "",
    showlegend: false,
  };

  let plotData = [candlestickTrace];

  if (indicatorsVisible) {
    // Compute RSI, MACD, Bollinger, etc.
    const { upper, lower } = computeBollingerBands(closes);
    const rsiArr = computeRSI(closes, 14);
    const { macdLine, signalLine, histogram } = computeMACD(closes);

    // Bollinger
    const bbUpperTrace = {
      x: xs,
      y: upper,
      type: "scatter",
      mode: "lines",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      line: { color: "purple" },
    };
    const bbLowerTrace = {
      x: xs,
      y: lower,
      type: "scatter",
      mode: "lines",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      line: { color: "orange" },
    };

    // RSI
    const rsiTrace = {
      x: xs,
      y: rsiArr,
      type: "scatter",
      mode: "lines",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      yaxis: "y2",
    };

    // MACD
    const macdTrace = {
      x: xs,
      y: macdLine,
      type: "scatter",
      mode: "lines",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      yaxis: "y3",
      line: { color: "blue" },
    };
    const macdSignalTrace = {
      x: xs,
      y: signalLine,
      type: "scatter",
      mode: "lines",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      yaxis: "y3",
      line: { color: "red" },
    };
    const macdHistTrace = {
      x: xs,
      y: histogram,
      type: "bar",
      name: "",
      showlegend: false,
      hovertemplate: "%{y:.2f}<extra></extra>",
      yaxis: "y3",
      marker: { color: "lightblue" },
      opacity: 0.5,
    };

    plotData.push(
      bbUpperTrace,
      bbLowerTrace,
      rsiTrace,
      macdTrace,
      macdSignalTrace,
      macdHistTrace
    );
  }

  const layout = {
    uirevision: `${coin}-${timeframe}`,
    shapes: lines,
    showlegend: false,
    autosize: true,
    paper_bgcolor: "#000",
    plot_bgcolor: "#121212",
    font: { color: "#fff" },
    dragmode: "pan",
    xaxis: {
      type: "date",
      autorange: true,
      showgrid: true,         // show grid lines
    gridcolor: "#fff",
    gridwidth: 0.1,           // grid line thickness
      rangeslider: { visible: false },
    },
    yaxis: {
      title: `Price (${coin})`,
    },
    yaxis2: {
      overlaying: "y",
      side: "right",
      showgrid: true,         // show grid lines
    gridcolor: "#fff",
    gridwidth: 0.1,           // grid line thickness
      showticklabels: false,
    },
    yaxis3: {
      title: "MACD",
      overlaying: "y",
      showticklabels: false,
    },
    margin: { t: 50, b: 40, l: 80, r: 50 },
    title: `${coin} / ${timeframe.toUpperCase()}`,
  };

  return (
    <>
    <Header/>
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Radix Select for Coin */}
      
      <div style={{ marginBottom: 10 }}>
        <label style={{ marginRight: 5 }}>Coin:</label>
        <Select.Root value={coin} onValueChange={(val) => setCoin(val)}>
          <Select.Trigger
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "1px solid #555",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              style={{
                backgroundColor: "#000",
                border: "1px solid #555",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              <Select.Viewport>
                <Select.Item value="BTCUSDT">
                  <Select.ItemText>BTC/USDT</Select.ItemText>
                </Select.Item>
                <Select.Item value="ETHUSDT">
                  <Select.ItemText>ETH/USDT</Select.ItemText>
                </Select.Item>
                <Select.Item value="BNBUSDT">
                  <Select.ItemText>BNB/USDT</Select.ItemText>
                </Select.Item>
                <Select.Item value="XRPUSDT">
                  <Select.ItemText>XRP/USDT</Select.ItemText>
                </Select.Item>
                <Select.Item value="SOLUSDT">
                  <Select.ItemText>SOL/USDT</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Radix Select for Timeframe */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ marginRight: 5 }}>Timeframe:</label>
        <Select.Root value={timeframe} onValueChange={(val) => setTimeframe(val)}>
          <Select.Trigger
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "1px solid #555",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              style={{
                backgroundColor: "#000",
                border: "1px solid #555",
                borderRadius: "4px",
                color: "#fff",
              }}
            >
              <Select.Viewport>
                <Select.Item value="1m">
                  <Select.ItemText>1m</Select.ItemText>
                </Select.Item>
                <Select.Item value="5m">
                  <Select.ItemText>5m</Select.ItemText>
                </Select.Item>
                <Select.Item value="15m">
                  <Select.ItemText>15m</Select.ItemText>
                </Select.Item>
                <Select.Item value="1h">
                  <Select.ItemText>1h</Select.ItemText>
                </Select.Item>
                <Select.Item value="4h">
                  <Select.ItemText>4h</Select.ItemText>
                </Select.Item>
                <Select.Item value="1d">
                  <Select.ItemText>1d</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* AI Explanation */}
      

      {/* AI Analyze Button (Radix Slot) */}
      <RadixButton
        disabled={isAnalyzing}
        onClick={handleAnalyzeClick}
        style={{
          marginBottom: 10,
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "1px solid #3700b3",
          backgroundColor: "transparent",
          fontSize: "1rem",
          cursor: "pointer",
          color: "#007bff",
          transition: "color 0.3s ease, border-color 0.3s ease",
        }}
      >
        {isAnalyzing ? "Analyzing..." : "AI Analysis"}
      </RadixButton>

      <div style={{ marginBottom: 10, whiteSpace: "pre-line" }}>
        <strong>AI Explanation:</strong> {aiParagraph || "No analysis yet."}
      </div>

      {isAnalyzing && (
        <div style={{ marginBottom: 10, width: "50%", background: "#444" }}>
          <div style={{ width: "100%", background: "lime", textAlign: "center" }}>
            Analyzing...
          </div>
        </div>
      )}

      {/* Plotly Chart */}
      <div style={{ width: "90%", height: 600 }}>
        {data.length > 0 ? (
          <Plot
            data={plotData}
            layout={layout}
            style={{ width: "100%", height: "100%", background: "#000"}}
            useResizeHandler
          />
        ) : (
          <div style={{ textAlign: "center", paddingTop: 100 }}>
            Loading data...
          </div>
        )}
      </div>

      <Footer />
    </div>
   </>
  );
}
