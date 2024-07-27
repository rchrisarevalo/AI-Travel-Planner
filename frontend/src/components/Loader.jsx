import Spinner from 'react-bootstrap/Spinner'

export default function Loader({ children, pending, error }) {
    return (
        <div className="loading">
            {!pending ?
                !error ?
                    children
                    :
                    <>
                        <p>There was an error processing your request. Please try again.</p>
                        <button>Try again.</button>
                    </>
                :
                <Spinner animation="border" variant="success" />
            }
        </div>
    )
}