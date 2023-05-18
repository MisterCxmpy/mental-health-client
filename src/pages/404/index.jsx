import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className='layout' style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems:'center', height: "100vh" }}>
            <div>
                <h1>Oops, seems like you&apos;ve gone to a page that doesn&apos;t exist.</h1>
                <p>That&apos;s okay, you can get back <Link to={'/'} ><span style={{textDecoration: "underline"}}>here.</span></Link></p>
            </div>
        </div>
    )
}
