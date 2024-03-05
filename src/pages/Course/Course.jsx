import classes from './Course.module.scss'
import Videos from '../../components/Videos/Videos'
import { Link, useParams } from 'react-router-dom'

export default function Course() {
  const params = useParams()
  return (
    <div className={classes.Course}>
       <Videos/>
       <Link to={`/tests/${params.id}`}>Start test</Link>
    </div>
   
  )
}
