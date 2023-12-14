const Dirty = ({ className, dirty, error }) => {
    return (
        <div className={className}>
            {
                (dirty && error) 
                && <div style={{color: 'red'}}>{error}</div>
            }
        </div>
    )
}

export default Dirty