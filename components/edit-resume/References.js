const References = ({ references }) => {
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-check-square ico'></i> References
      </h2>

      {references.map((ref, index) => {
        return (
          <div key={index}>
            <div>{ref.reference}</div>
            <footer>
              <a href='' target='_blank'>
                {ref.name}
              </a>
            </footer>
          </div>
        );
      })}
    </div>
  );
};

export default References;
