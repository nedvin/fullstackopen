const Header = ({ text }) => <h2>{text}</h2>;

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const { name, parts } = course;

  const sumExercises = () =>
    parts.reduce((accumulated, current) => accumulated + current.exercises, 0);

  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
      <Total sum={sumExercises()} />
    </div>
  );
};

export default Course;
