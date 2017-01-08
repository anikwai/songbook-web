import React from 'react'
import {Subheader} from 'material-ui'
import ActionFavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';

import {SongText} from './SongText.jsx'
import {SongAbc}  from './SongAbc.jsx'

export const SongView = ({data}) => (
    <div className="content-wrapper">
        <div className='content padded song-view'>
            <header>
                <h1>{data.title}</h1>
                <h2>{data.artist}</h2>
                <p className='song-comment'>{data.comment}</p>
                <p className='song-link'><a title='Link' href={data.link}>{data.link}</a></p>
            </header>
            {data.abc  ? <SongAbc  abc={data.abc}   /> : null}
            {data.text ? <SongText text={data.text} /> : null}
        </div>
    </div>
)
SongView.propTypes = {
    data: React.PropTypes.object.isRequired,
}
