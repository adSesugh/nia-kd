import { Select, SelectItem } from '@nextui-org/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import React from 'react'

type PaginationProps = {
    page: number
    itemPerPage: number
    total: number
}

const pagingItems: number[] = [15, 30, 45, 60, 100]

const Pagination: React.FC<PaginationProps> = ({page = 1, itemPerPage = 15, total=0}) => {
    
    return (
        <div className='flex justify-between'>
            <div>
                <Select
                    className="max-w-xs"
                >
                {pagingItems.map((item: number) => (
                    <SelectItem key={item} value={item}>
                        Rows {item}
                    </SelectItem>
                ))}
                </Select>
            </div>
            <div className='flex'>
                <CaretLeft size={32} />
                <span>{page} - {itemPerPage} of {total}</span>
                <CaretRight size={32} />
            </div>
        </div>
    )
}

export default Pagination