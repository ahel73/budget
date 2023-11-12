import {FC, useState} from 'react';
import {AiFillClockCircle, AiFillEdit} from "react-icons/ai";
import {Form, useLoaderData} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import { CategoryModal } from "../components/CategoryModal.tsx";
import {instance} from "../api/axios.api.ts";
import {ICategory} from "../types/types.ts";

// отправка запроса на добавление редактирование и удаление категории
export const categoriesAction = async ({request}: any) => {
    console.log('request', request)
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData();
            const title = {
                title: formData.get('title'),
            }
            await instance.post('/categories', title);
            return null;
        }
        case 'PATCH': {
            const formData = await request.formData();
            const category = {
                id: formData.get('id'),
                title: formData.get('title'),
            };
            await instance.patch(`/categories/category/${formData.get('id')}`, category)
            return null;
        }
        case 'DELETE': {
            const formData = await request.formData();
            const categoryId = formData.get('id');
            await instance.delete(`/categories/category/${categoryId}`)
            return null;
        }
    }
}

// тправка запроса на вывод категорий
export const categoryLoader = async () => {
    const {data} = await instance.get<ICategory>('/categories');
    return data;
}

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[];
    const [caregoryId, setCaregoryId] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [title, setTitle] = useState('')
    const [visibleModal, setVisibleModal] = useState(false)
    console.log('categories', categories)
    return (
        <>
            <div className="mt-10 rounded-md bg-slate-800 p-4">
                <h1>Ваш список категорий</h1>
                {/*Список категорий*/}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                    {
                        categories.map((category, idx) => (
                            <div key={category.id} className='group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2'>
                                {category.title}
                                <div className="absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
                                    <button onClick={() => {
                                        setVisibleModal(true);
                                        setCaregoryId(category.id)
                                        setIsEdit(true)
                                        setTitle(category.title)
                                    }}>
                                        <AiFillEdit />
                                    </button>

                                    <Form className='flex' method='delete' action=''>
                                        <input type="hidden" name='id' value={category.id}/>
                                        <button type='submit'>
                                            <AiFillClockCircle />
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <button type='button' onClick={() => setVisibleModal(true)}  className='mt-5 flex max-w-fit items-center gap-2 to-white/50 hover:to-white'>
                    <FaPlus />
                    <span>Добавить новую категорию</span>
                </button>
            </div>


            {/* Окно добавления категории */}
            { visibleModal && !isEdit && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}

            {/* Окно редактирования категории */}
            { visibleModal && isEdit && <CategoryModal type='patch' id={caregoryId} setVisibleModal={setVisibleModal} />}
        </>
    )
}

export default Categories;