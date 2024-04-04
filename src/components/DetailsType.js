import React from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

const DetailsType = ({ bulletedList = true, list, listName }) => {
    return (
        <>
            <div className={'pokedex__type-container'} key={uuidv4()}>
                <h3 className={'pokedex__type-name'}>{listName}</h3>
                {list.length > 0 && (
                    <ul
                        className={classnames({
                            'pokedex__type-list': true,
                            'no-bullets': !bulletedList,
                        })}
                    >
                        {list.map((item) => {
                            return (
                                <li
                                    className={classnames({
                                        'pokedex__type-list': true,
                                        horizontal: !bulletedList,
                                    })}
                                    key={uuidv4()}
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default DetailsType;
