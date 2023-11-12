import {FC} from "react";
import {Form} from "react-router-dom";

interface ICategoryModal {
    type: 'post' | 'patch';
    id?: number;
    setVisibleModal: (visible: boolean) => void;
}
export const CategoryModal: FC<ICategoryModal> = ({type, id, setVisibleModal}) => {
    console.log(id ? 'редактируем' : 'создаём');
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
            <Form
                action='/categories'
                method={type}
                onSubmit={() => setVisibleModal(false)}
                className='grid gap-2 w=[300px] rounded-md bg-slate-900 p-5'
            >
                <label htmlFor='title'>
                    <small>Название</small>
                    <input className='input w-full' type="text" name='title' id='title'/>
                    <input type="hidden" name="id" value={id}/>
                </label>

                <div className="flex items-center gap-2">
                    <button className='btn btn-green'  type='submit'>
                        {type === 'patch' ? 'обновить' : 'создать'}
                    </button>
                    <button onClick={() => setVisibleModal(false)} className='btn btn-red'>Выйти</button>
                </div>
            </Form>
        </div>
    );
};