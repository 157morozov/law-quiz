import './style.css';

function QuestionCard({ question, selectedAnswers, onToggleOption }) {
  return (
    <article className="question-card">
      <div className="question-card__header">
        <span className="question-card__badge">Улика</span>
        <h2 className="question-card__title">{question.prompt}</h2>
        <p className="question-card__hint">
          {question.isMultiple ? 'Можно выбрать несколько вариантов.' : 'Выбери один правильный вариант.'}
        </p>
      </div>

      {question.image && (
        <div className="question-card__image-wrap">
          <img className="question-card__image" src={question.image} alt="Иллюстрация к вопросу" />
        </div>
      )}

      <div className="question-card__options">
        {question.options.map((option) => {
          const checked = selectedAnswers.includes(option);

          return (
            <label key={option} className={`question-card__option ${checked ? 'question-card__option--active' : ''}`}>
              <input
                className="question-card__input"
                type={question.isMultiple ? 'checkbox' : 'radio'}
                name={question.id}
                checked={checked}
                onChange={() => onToggleOption(option)}
              />
              <span className="question-card__marker" />
              <span className="question-card__option-text">{option}</span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

export default QuestionCard;
