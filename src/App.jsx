import { useState } from 'react';
import { generateTest, defaultConfig } from './utils/generateQuestions';

function colsForFormat(format) {
  switch (format) {
    case 'vertical':   return 3;
    case 'horizontal': return 2;
    case 'word':       return 1;
    case 'geometry':   return 2;
    default:           return 2;
  }
}

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [test, setTest] = useState(null);

  const handleGenerate = () => {
    setTest(generateTest(config));
  };

  const handlePrint = () => {
    window.print();
  };

  const updateConfig = (section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  return (
    <div className="app">
      <div className="config-panel no-print">
        <h1>Math Practice Test Generator</h1>

        <div className="config-sections">
          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.subtraction.enabled}
                onChange={(e) => updateConfig('subtraction', 'enabled', e.target.checked)}
              />
              <span>Section 1: Subtraction with Borrowing</span>
            </label>
            {config.subtraction.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>2-digit questions:</label>
                  <input type="number" min="0" max="100" value={config.subtraction.twoDigit}
                    onChange={(e) => updateConfig('subtraction', 'twoDigit', +e.target.value)} />
                </div>
                <div className="field">
                  <label>3-digit questions:</label>
                  <input type="number" min="0" max="100" value={config.subtraction.threeDigit}
                    onChange={(e) => updateConfig('subtraction', 'threeDigit', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.subtraction.timeMinutes}
                    onChange={(e) => updateConfig('subtraction', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.addition.enabled}
                onChange={(e) => updateConfig('addition', 'enabled', e.target.checked)}
              />
              <span>Section 2: Addition</span>
            </label>
            {config.addition.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>Simple (no carry):</label>
                  <input type="number" min="0" max="100" value={config.addition.simple}
                    onChange={(e) => updateConfig('addition', 'simple', +e.target.value)} />
                </div>
                <div className="field">
                  <label>With carrying:</label>
                  <input type="number" min="0" max="100" value={config.addition.carrying}
                    onChange={(e) => updateConfig('addition', 'carrying', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.addition.timeMinutes}
                    onChange={(e) => updateConfig('addition', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.multiplication.enabled}
                onChange={(e) => updateConfig('multiplication', 'enabled', e.target.checked)}
              />
              <span>Section 3: Multiplication</span>
            </label>
            {config.multiplication.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>Questions:</label>
                  <input type="number" min="0" max="100" value={config.multiplication.count}
                    onChange={(e) => updateConfig('multiplication', 'count', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.multiplication.timeMinutes}
                    onChange={(e) => updateConfig('multiplication', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.division.enabled}
                onChange={(e) => updateConfig('division', 'enabled', e.target.checked)}
              />
              <span>Section 4: Division</span>
            </label>
            {config.division.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>Questions:</label>
                  <input type="number" min="0" max="100" value={config.division.count}
                    onChange={(e) => updateConfig('division', 'count', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.division.timeMinutes}
                    onChange={(e) => updateConfig('division', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.wordProblems.enabled}
                onChange={(e) => updateConfig('wordProblems', 'enabled', e.target.checked)}
              />
              <span>Section 5: Word Problems</span>
            </label>
            {config.wordProblems.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>Questions:</label>
                  <input type="number" min="0" max="30" value={config.wordProblems.count}
                    onChange={(e) => updateConfig('wordProblems', 'count', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.wordProblems.timeMinutes}
                    onChange={(e) => updateConfig('wordProblems', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <div className="config-card">
            <label className="config-header">
              <input
                type="checkbox"
                checked={config.geometry.enabled}
                onChange={(e) => updateConfig('geometry', 'enabled', e.target.checked)}
              />
              <span>Section 6: Geometry</span>
            </label>
            {config.geometry.enabled && (
              <div className="config-fields">
                <div className="field">
                  <label>Questions:</label>
                  <input type="number" min="0" max="20" value={config.geometry.count}
                    onChange={(e) => updateConfig('geometry', 'count', +e.target.value)} />
                </div>
                <div className="field">
                  <label>Time (minutes):</label>
                  <input type="number" min="1" max="120" value={config.geometry.timeMinutes}
                    onChange={(e) => updateConfig('geometry', 'timeMinutes', +e.target.value)} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate New Test
          </button>
          {test && (
            <button className="btn btn-secondary" onClick={handlePrint}>
              Print Test
            </button>
          )}
        </div>
      </div>

      {test && (
        <div className="test-output">
          <div className="test-content">
            <div className="test-header">
              <div className="name-date-row">
                <div className="name-field">Name: ________________________________</div>
                <div className="date-field">Date: ________________</div>
              </div>
            </div>

            {Object.entries(test).map(([key, section], sectionIdx) => (
              <div key={key} className="section-block">
                <div className={`section-header${sectionIdx > 0 ? ' section-divider' : ''}`}>
                  <h2>Section {sectionIdx + 1}: {section.label}</h2>
                  <p className="section-meta">
                    <em>Time: {section.time} minutes | {section.totalQuestions} questions</em>
                  </p>
                </div>
                <div className={`question-grid cols-${colsForFormat(section.format)}`}>
                  {section.questions.map((q, idx) => {
                    const num = idx + 1;
                    if (section.format === 'vertical') return <VerticalProblem key={idx} num={num} question={q} />;
                    if (section.format === 'horizontal') return <HorizontalProblem key={idx} num={num} question={q} />;
                    if (section.format === 'word') return <WordProblem key={idx} num={num} question={q} />;
                    if (section.format === 'geometry') return <GeometryProblem key={idx} num={num} question={q} />;
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>

          <AnswerKey test={test} />
        </div>
      )}
    </div>
  );
}

function VerticalProblem({ num, question }) {
  const { a, b, op } = question;
  const maxDigits = Math.max(String(a).length, String(b).length);

  return (
    <div className="problem vertical-problem">
      <div className="problem-num">{num}.</div>
      <div className="problem-body">
        <div className="operand" style={{ minWidth: `${maxDigits + 1}ch` }}>
          {a}
        </div>
        <div className="operand-row" style={{ minWidth: `${maxDigits + 1}ch` }}>
          <span className="operator">{op === '+' ? '+' : '\u2013'}</span>
          <span className="operand-value">{b}</span>
        </div>
        <div className="problem-line" style={{ width: `${maxDigits + 2}ch` }}></div>
      </div>
    </div>
  );
}

function HorizontalProblem({ num, question }) {
  const { a, b, op } = question;
  return (
    <div className="problem horizontal-problem">
      <div className="problem-num">{num}.</div>
      <div className="problem-body-h">
        <span>{a}</span>
        <span className="h-operator">{op}</span>
        <span>{b}</span>
        <span className="h-equals">=</span>
        <span className="h-blank">_______</span>
      </div>
    </div>
  );
}

function WordProblem({ num, question }) {
  return (
    <div className="problem word-problem">
      <div className="problem-num">{num}.</div>
      <div className="word-problem-body">
        <p className="word-problem-text">{question.text}</p>
        <div className="word-problem-answer">Answer: _________</div>
      </div>
    </div>
  );
}

function RectangleSVG({ length, width }) {
  const W = 120, H = 80;
  return (
    <svg viewBox="-30 -20 180 120" className="shape-svg">
      <rect x="0" y="0" width={W} height={H} fill="none" stroke="#333" strokeWidth="2" />
      <text x={W / 2} y={H + 16} textAnchor="middle" fontSize="13" fontWeight="600">{length}</text>
      <text x={W + 14} y={H / 2 + 4} textAnchor="start" fontSize="13" fontWeight="600">{width}</text>
    </svg>
  );
}

function SquareSVG({ side }) {
  const S = 90;
  return (
    <svg viewBox="-20 -20 140 130" className="shape-svg">
      <rect x="0" y="0" width={S} height={S} fill="none" stroke="#333" strokeWidth="2" />
      <text x={S / 2} y={S + 16} textAnchor="middle" fontSize="13" fontWeight="600">{side}</text>
    </svg>
  );
}

function TriangleSVG({ base, height }) {
  const W = 120, H = 90;
  const points = `0,${H} ${W},${H} ${W / 2},0`;
  return (
    <svg viewBox="-20 -15 170 130" className="shape-svg">
      <polygon points={points} fill="none" stroke="#333" strokeWidth="2" />
      <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#333" strokeWidth="1" strokeDasharray="4,3" />
      <text x={W / 2} y={H + 16} textAnchor="middle" fontSize="13" fontWeight="600">{base}</text>
      <text x={W / 2 + 14} y={H / 2 + 4} textAnchor="start" fontSize="12" fontWeight="600">{height}</text>
    </svg>
  );
}

function GeometryProblem({ num, question }) {
  const q = question;
  let shapeSvg = null;
  if (q.shape === 'rectangle') shapeSvg = <RectangleSVG length={q.length} width={q.width} />;
  else if (q.shape === 'square') shapeSvg = <SquareSVG side={q.side} />;
  else if (q.shape === 'triangle') shapeSvg = <TriangleSVG base={q.base} height={q.height} />;

  return (
    <div className="problem geometry-problem">
      <div className="problem-num">{num}.</div>
      <div className="geometry-body">
        {shapeSvg}
        <p className="geometry-question-text">{q.question}</p>
        <div className="geometry-answer">Answer: _________</div>
      </div>
    </div>
  );
}

function AnswerKey({ test }) {
  const sections = Object.entries(test);

  return (
    <div className="answer-key-section">
      <h2 className="answer-key-title">Answer Key</h2>
      {sections.map(([key, section], sectionIdx) => (
        <div key={key} className="answer-section">
          <h3>Section {sectionIdx + 1}: {section.label}</h3>
          <div className="answer-grid">
            {section.questions.map((q, idx) => (
              <div key={idx} className="answer-item">
                {idx + 1}.{' '}
                {section.format === 'word'
                  ? (q.answerText ?? String(q.answer))
                  : section.format === 'geometry'
                  ? q.answerText
                  : `${q.a}${section.format === 'vertical' ? (q.op === '+' ? '+' : '-') : q.op}${q.b}=${q.answer}`}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
