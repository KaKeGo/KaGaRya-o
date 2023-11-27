import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { GameDetail } from '../../../slice/GameLists/GameDetail/gameDetailSlice'

import FadeIn from '../../../animations/FadeIn/FadeIn'

import './GameDetailView.css'


const GameDetailView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams()

  const game = useSelector(state => state.gameDetail.game)
  const status = useSelector(state => state.gameDetail.status)
  const error = useSelector(state => state.gameDetail.error)
  const {user, isAuthenticated} = useSelector((state) => state.authCheck)

  const [userLoaded, setUserLoaded] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(GameDetail(slug))
    }
    if (user) {
      setUserLoaded(true)
    }
  }, [status, dispatch, slug, user])

  useEffect(() => {
    dispatch(GameDetail(slug));
  }, [dispatch, slug]);

  if (status === 'loading') {
    return <div className='containers'>
      <div>Loading...</div>
    </div>
  } else if (status === 'idle' || status === 'succeeded') {
    return (
      <FadeIn>
      <div className='containers'>
        <div className='gamedetail__containers'>

        <div className='gamedetail__buttons'>

          <button 
            className='button__left btn__nav'
          >
            Back
          </button>

          <div className='button__right'>
            {userLoaded && user.roles.includes('GameCreator') && (
              <>
                <button className='button__delete btn__nav'>Delete</button>
                <button className='button__update btn__nav'>Update</button>
              </>
            )}
            {isAuthenticated && !user.roles.includes('GameCreator') && (
              <button className='button__report btn__nav'>Report</button>
            )}

          </div>

        </div>

        <div className='gamedetail__box'>

            <div className='gamedetail__column1'>

              <div className='inner__column1'>

                <div className='gamedetail__cover'>
                  <img className='cover' src='https://i.redd.it/bueqtztxmnj81.png' alt={game.title}/>
                </div>

                <div className='gamedetail__title'>
                  <h2>{game.title}</h2>
                </div>
                <div className='gamedetail__content score'>
                  <h2>Users score: {game.average_rating}</h2>
                </div>
                <div className='gamedetail__content'>
                  <h2>Content:</h2>
                  <p>{game.category}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>Version:</h2>
                  <p>{game.game_version}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>Developer:</h2>
                  <p>{game.developer}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>Publisher:</h2>
                  <p>{game.game_publisher}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>Release Date:</h2>
                  <p>{game.release_date}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>Type of Game:</h2>
                  <p>{game && game.game_type && game.game_type.join(', ')}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>game mode:</h2>
                  <p>{game && game.game_mode && game.game_mode.join(', ')}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>platforms:</h2>
                  <p>{game && game.platforms && game.platforms.join(', ')}</p>
                </div>
                <div className='gamedetail__content'>
                  <h2>tags:</h2>
                  <p>{game && game.tags && game.tags.join(', ')}</p>
                </div>

              </div>

              <div className='inner__column2'>

                <div className='trailer__container'>
                {game && game.trailer && (
                  <div className='trailer__container'>
                  <iframe 
                    className='trailer'
                    width="560" 
                    height="315" 
                    src={`${game.trailer}&autoplay=1&loop=1&mute=1&modestbranding=1&playlist=${game.trailer.split('/').pop().split('?')[0]}`}
                    title="Trailer" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    ></iframe>
                  </div>
                )}
                </div>

                <div className='horizontal__line'></div>

                <div className='body__container'>
                {game && game.body && game.body.split('\r\n\r\n').map((paragraph, index) => (
                  <p key={index}>{paragraph.replace('\r\n', ' ')}</p>
                ))}
                </div>

              </div>
              
            </div>

            <div className='horizontal__line'></div>

            <div className='gamedetail__column2'>

              <h2 className='system__requirements__title'>System requirements</h2>

              <div className='column2__content'>
                <div className='column'>

                  <h3 className='column__title'>Minimum</h3>
                  <div className='column__horizontal__line'></div>
                  <p className='column__content'>Zawartość Kolumny 3</p>

                </div>
                <div className='column'>

                  <h3 className='column__title'>Recommended</h3>
                  <div className='column__horizontal__line'></div>
                  <p className='column__content'>Zawartość Kolumny 3</p>

                </div>
                <div className='column'>

                  <h3 className='column__title'>Highest</h3>
                  <div className='column__horizontal__line'></div>
                  <p className='column__content'>Zawartość Kolumny 3</p>
                  
                </div>
              </div>

            </div>

            <div className='horizontal__line'></div>

            <div className='gamedetail__column3'>

              <div className='gamedetail__column3__text'>
                <p>Added by: {game.added_by}</p>
              </div>

              <p>
                If you have found any inaccuracies or have an idea on how to make things better, 
                click 'Report' and write to us.
              </p>

            </div>

        </div>
        </div>
      </div>
      </FadeIn>
    )
  } else if (status === 'failed') {
    return <div className='containers'>
      <div>Error: {error}</div>
    </div>
  } else {
    return <div className='containers'>
      <div>Unexpected status: {status}</div>
    </div>
  }
}

export default GameDetailView