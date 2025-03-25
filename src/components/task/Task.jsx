import './Task.css'
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";

export default function Task({todo, handleClickOpen, handleUpdateTask}) {
    return (
        <>
            <div className="task mb-2 d-flex justify-content-between align-items-center" >
                <h3 className='m-0'>{todo.taskName}</h3>
                <div className="action d-flex gap-3">
                    <FaPencil onClick={()=> handleUpdateTask(todo.id)} className='icon fs-5 text-primary'/>
                    <FaRegTrashCan className='icon fs-5 text-danger' onClick={()=> handleClickOpen(todo.id)}/>
                </div>
            </div>
        </>
    )
}
