import { simpleDateFormat } from '@/utils';
import Image from 'next/image';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';

interface Props {
    issueNumber: number;
    title: string;
    issueDate: string;
    imageUri: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const Card: React.FC<Props> = (props) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-2 left-2 z-10 bg-white text-black text-md font-semibold px-2 py-0 rounded-full">
                #{props.issueNumber}
            </div>
            <div className="relative w-full h-64">
                <Image src={props.imageUri} alt={props.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
            </div>
            <div className="p-4 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">{props.title}</h2>
                    <p className="text-gray-500">{simpleDateFormat(props.issueDate)}</p>
                </div>
                <div className="flex space-x-2">
                    <Button type='icon' icon={<PencilSquareIcon className="h-5 w-5" />} backgroundColor='blue' onClick={props.onEdit} />
                    <Button type='icon' icon={<TrashIcon className="h-5 w-5" />} backgroundColor='red' onClick={props.onRemove} />
                </div>
            </div>
        </div>
    )
}