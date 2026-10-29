'use client';

import { useEffect, useRef, useState } from 'react';

import {

  Heart,

  Pause,

  Play,

  SkipBack,

  SkipForward,

  Shuffle,

  Volume2,

} from 'lucide-react';

const tracks = [

  {

    title: 'Live or Die 2.0 (Revisit)',

    artist: 'ThaMusiq',

    genre: 'Amapiano',

    type: 'Single',

    time: '8:08',

    cover: "url('/live-or-die-2-cover.png') center/cover",

    audio: '/live-or-die-2.mp3',

  },

  {

    title: '09:16 II',

    artist: 'ThaMusiq',

    genre: 'Amapiano',

    type: 'EP',

    time: '',

    cover: "url('/eps/0916 II Cover.png') center/cover",

    audio: '/eps/01.ThaMusiq - New Day 2.0 (Remix).mp3',

  },

  {

    title: '09:16',

    artist: 'ThaMusiq',

    genre: 'Amapiano',

    type: 'EP',

    time: '',

    cover: "url('/eps/0916 Cover.jpeg') center/cover",

    audio: '/eps/01.ThaMusiq - Me&You (ThaMusiq PSP Remix).mp3',

  },

  {

    title: 'ThaMusiq - Sgidongo',

    artist: 'ThaMusiq',

    genre: 'Amapiano',

    type: 'Single',

    time: '8:00',

    cover: "url('/singles/sgidongo cover.jpeg') center/cover",

    audio: '/singles/ThaMusiq - Sgidongo.mp3',

  },

  {

    title: "Bayavuma (ThaMusiq's Amapiano Remix)",

    artist: 'ThaMusiq feat. Kila G',

    genre: 'Amapiano',

    type: 'Single',

    time: '8:38',

    cover: "url('/singles/Bayavuma.jpeg') center/cover",

    audio: "/singles/Bayavuma (ThaMusiq's Amapiano Remix).mp3",

  },

  {

    title: 'A Tastes Of ThaMusiq II',

    artist: 'ThaMusiq',

    genre: 'Amapiano',

    type: 'EP',

    time: '',

    cover: "url('/eps/ATT2 Cover.png') center/cover",

    audio: '/eps/01.ThaMusiq - I Tried (Remix).mp3',

  },

];

const singleTracks = tracks

  .map((track, index) => ({ track, index }))

  .filter(({ track }) => track.type === 'Single');

const releaseTracks = tracks

  .map((track, index) => ({ track, index }))

  .filter(({ track }) => track.type === 'EP');

const epTracklists: Record<

  number,

  { title: string; audio: string }[]

> = {

  1: [

    {

      title: 'New Day 2.0 (Remix)',

      audio: '/eps/01.ThaMusiq - New Day 2.0 (Remix).mp3',

    },

    {

      title: 'Back To Life (Remix)',

      audio: '/eps/02.ThaMusiq - Back To Life (Remix).mp3',

    },

    {

      title: 'Ithuba (Revisit)',

      audio: '/eps/03.ThaMusiq - Ithuba (Revisit).mp3',

    },

    {

      title: '09:16 II',

      audio: '/eps/04.ThaMusiq - 0916 II.mp3',

    },

    {

      title: 'Sghubu Tech',

      audio: '/eps/05.ThaMusiq - Sghubu Tech.mp3',

    },

    {

      title: 'PNKK',

      audio: '/eps/06.ThaMusiq - PNKK.mp3',

    },

    {

      title: 'Number Number 2.0',

      audio: '/eps/07.ThaMusiq - Number Number 2.0.mp3',

    },

    {

      title: 'Son Of Dragon (Revisit)',

      audio: '/eps/08.ThaMusiq - Son Of Dragon (Revisit).mp3',

    },

  ],

  2: [

    {

      title: 'Me&You (Remix)',

      audio: '/eps/01.ThaMusiq - Me&You (ThaMusiq PSP Remix).mp3',

    },

    {

      title: "Камин (Remix)",

      audio: "/eps/02.ThaMusiq - Камин (ThaMusiq's Exclusive Remix).mp3",

    },

    {

      title: 'Sgijarious',

      audio: '/eps/03.ThaMusiq - Sgijarious.mp3',

    },

    {

      title: 'HTM (Sgija Mix)',

      audio: '/eps/04.ThaMusiq - HTM (Sgija Mix).mp3',

    },

    {

      title: "Naja 2.0 (Sghubu Remix)",

      audio: "/eps/05.ThaMusiq - Naja 2.0 (ThaMusiq's Sghubu Remix).mp3",

    },

  ],

5: [

    {

      title: 'I Tried (Remix)',

      audio: '/eps/01.ThaMusiq - I Tried (Remix).mp3',

    },

    {

      title: "Girls Want Girls (Amapiano Remix)",

      audio: "/eps/02.ThaMusiq - Girls Want Girls (Amapiano Remix).mp3",

    },

    {

      title: 'We Found Love (Remix)',

      audio: '/eps/03.ThaMusiq - We Found Love (Remix).mp3',

    },

    {

      title: 'Momo 2.0 (Re-Edit)',

      audio: '/eps/04.ThaMusiq - Momo 2.0 (Revisit).mp3',

    },

    {

      title: 'Chords & Keys (Soulfied Mix)',

      audio: '/eps/05.ThaMusiq - Chords & Keys (Soulfied Mix).mp3',

    },

    {

      title: "####(Sakaa)",

      audio: '/eps/06.ThaMusiq - Sakaa.mp3',

    },

  ],

};

export default function Home() {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isSeeking = useRef(false);

  const [playing, setPlaying] = useState<number | null>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [epPlaying, setEpPlaying] = useState<number | null>(null);

  const [epReleaseIndex, setEpReleaseIndex] = useState<number | null>(null);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);

  const [volume, setVolume] = useState(1);

  const [shuffle, setShuffle] = useState(false);

  const [liked, setLiked] = useState(false);

  const [likes, setLikes] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('tha-sounds-favorites-v1');
      const savedTheme = localStorage.getItem('tha-sounds-theme-v1');
      const savedCounts = localStorage.getItem('tha-sounds-play-counts-v1');
      if (savedFavorites) setFavoriteKeys(JSON.parse(savedFavorites));
      if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
      if (savedCounts) setPlayCounts(JSON.parse(savedCounts));
    } catch (error) {
      console.warn('THA SOUNDS could not load saved preferences:', error);
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem('tha-sounds-favorites-v1', JSON.stringify(favoriteKeys)); }
    catch (error) { console.warn('THA SOUNDS could not save favorites:', error); }
  }, [favoriteKeys, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem('tha-sounds-theme-v1', theme); }
    catch (error) { console.warn('THA SOUNDS could not save theme:', error); }
  }, [theme, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem('tha-sounds-play-counts-v1', JSON.stringify(playCounts)); }
    catch (error) { console.warn('THA SOUNDS could not save play counts:', error); }
  }, [playCounts, preferencesLoaded]);

  const activeEpTracks =

  epTracklists[epReleaseIndex ?? 1] ?? epTracklists[1];

  const currentTrack =

    epPlaying !== null

      ? {

          ...activeEpTracks[epPlaying],

          artist: 'ThaMusiq',

          cover:

            tracks[epReleaseIndex ?? 1]?.cover ??

            "url('/eps/0916 II Cover.png') center/cover",

        }

      : playing !== null

        ? tracks[playing]

        : null;

  useEffect(() => {

    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    audio.pause();

    setIsAudioPlaying(false);

    audio.src = currentTrack.audio;

    audio.volume = volume;

    audio.load();

    setProgress(0);

    setDuration(0);

    audio.play().catch((error) => {

      console.error('THA SOUNDS playback failed:', error);

    });

  }, [playing, epPlaying, epReleaseIndex]);

  useEffect(() => {

    if (audioRef.current) {

      audioRef.current.volume = volume;

    }

  }, [volume]);

  const toggleTrack = (index: number) => {

    if (!audioRef.current) return;

    if (playing === index && epPlaying === null) {

      if (audioRef.current.paused) {

        audioRef.current.play().catch(() => {});

      } else {

        audioRef.current.pause();

      }

      return;

    }

    setProgress(0);
    recordPlay(index);
    setEpPlaying(null);
    setEpReleaseIndex(null);
    setPlaying(index);

  };

  const playEpTrack = (releaseIndex: number, trackIndex: number) => {

    if (

      epReleaseIndex === releaseIndex &&

      epPlaying === trackIndex &&

      playing === null

    ) {

      const audio = audioRef.current;

      if (audio) {

        if (audio.paused) {

          audio.play().catch(() => {});

        } else {

          audio.pause();

        }

      }

      return;

    }

    setProgress(0);
    recordPlay(releaseIndex);
    setPlaying(null);
    setEpReleaseIndex(releaseIndex);
    setEpPlaying(trackIndex);

  };

  const handleTimeUpdate = () => {

    const audio = audioRef.current;

    if (!audio) return;

    if (Number.isFinite(audio.duration) && audio.duration > 0) {

      setDuration(audio.duration);

    }

    if (!isSeeking.current) {

      setProgress(audio.currentTime);

    }

  };

  const handleLoadedMetadata = () => {

    const audio = audioRef.current;

    if (!audio) return;

    setDuration(

      Number.isFinite(audio.duration) && audio.duration > 0

        ? audio.duration

        : 0

    );

  };

  const handleDurationChange = () => {

    const audio = audioRef.current;

    if (!audio) return;

    if (Number.isFinite(audio.duration) && audio.duration > 0) {

      setDuration(audio.duration);

    }

  };

  const playNext = () => {

    setProgress(0);

    if (epPlaying !== null) {

      const length = activeEpTracks.length;

      if (length === 0) return;

      let next = shuffle

        ? Math.floor(Math.random() * length)

        : (epPlaying + 1) % length;

      if (shuffle && length > 1 && next === epPlaying) {

        next = (next + 1) % length;

      }

      setPlaying(null);

      setEpPlaying(next);

      return;

    }

    if (playing !== null) {

      const list = tracks

        .map((track, index) => ({ track, index }))

        .filter(({ track }) => track.type === 'Single')

        .map(({ index }) => index);

      const position = list.indexOf(playing);

      if (list.length === 0) return;

      let next = shuffle

        ? list[Math.floor(Math.random() * list.length)]

        : list[(position + 1 + list.length) % list.length];

      if (shuffle && list.length > 1 && next === playing) {

        next = list[(list.indexOf(next) + 1) % list.length];

      }

      setEpPlaying(null);

      setEpReleaseIndex(null);

      setPlaying(next);

    }

  };

  const playPrevious = () => {

    const audio = audioRef.current;

    if (audio && audio.currentTime > 3) {

      audio.currentTime = 0;

      setProgress(0);

      return;

    }

    setProgress(0);

    if (epPlaying !== null) {

      const length = activeEpTracks.length;

      if (length === 0) return;

      setPlaying(null);

      setEpPlaying((epPlaying - 1 + length) % length);

      return;

    }

    if (playing !== null) {

      const list = tracks

        .map((track, index) => ({ track, index }))

        .filter(({ track }) => track.type === 'Single')

        .map(({ index }) => index);

      const position = list.indexOf(playing);

      if (list.length === 0) return;

      setEpPlaying(null);

      setEpReleaseIndex(null);

      setPlaying(list[(position - 1 + list.length) % list.length]);

    }

  };

  const handleEnded = () => playNext();

  const seek = (value: number) => {

    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {

      return;

    }

    const newTime = Math.max(0, Math.min(value, audio.duration));

    audio.currentTime = newTime;

    setProgress(newTime);

  };

  const formatTime = (seconds: number) => {

    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);

    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${remaining.toString().padStart(2, '0')}`;

  };

  const openRelease = (index: number) => {
    setSelectedRelease(index);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#release-${index}`);
    }
  };

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((current) => current.includes(key)
      ? current.filter((item) => item !== key)
      : [...current, key]);
  };

  const isFavorite = (key: string) => favoriteKeys.includes(key);

  const recordPlay = (releaseIndex: number) => {
    const key = String(releaseIndex);
    setPlayCounts((current) => ({ ...current, [key]: (current[key] ?? 0) + 1 }));
  };

  const shareRelease = async (index: number) => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}#release-${index}`;
    const title = tracks[index]?.title ?? 'THA SOUNDS';
    const shareData = { title: `${title} | THA SOUNDS`, text: `Listen to ${title} by ThaMusiq on THA SOUNDS.`, url };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        window.alert('Release link copied!');
      } else {
        window.prompt('Copy this release link:', url);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') console.error('Could not share release:', error);
    }
  };

  const matchingRelease = (index: number) => {
    const query = searchQuery.trim().toLowerCase();
    const track = tracks[index];
    const releaseMatches = !query || `${track.title} ${track.artist} ${track.genre} ${track.type}`.toLowerCase().includes(query);
    const songMatches = track.type === 'EP' && (epTracklists[index] ?? []).some((song) => song.title.toLowerCase().includes(query));
    const favoriteMatches = !showFavorites || isFavorite('release:' + index) || (epTracklists[index] ?? []).some((_, songIndex) => isFavorite(`ep:${index}:${songIndex}`));
    return favoriteMatches && (releaseMatches || (!!query && songMatches));
  };

  useEffect(() => {
    const syncReleaseFromHash = () => {
      const match = window.location.hash.match(/^#release-(\d+)$/);
      if (match) {
        const index = Number(match[1]);
        if (tracks[index]) setSelectedRelease(index);
      } else if (window.location.hash === '#sounds' || window.location.hash === '') {
        setSelectedRelease(null);
      }
    };
    syncReleaseFromHash();
    window.addEventListener('hashchange', syncReleaseFromHash);
    return () => window.removeEventListener('hashchange', syncReleaseFromHash);
  }, []);

  const releaseCover = (index: number) => {

  if (index === 0) return '/live-or-die-2-cover.png';

  if (index === 1) return '/eps/0916 II Cover.png';

  if (index === 2) return '/eps/0916 Cover.jpeg';

  if (index === 3) return '/singles/sgidongo cover.jpeg';

  if (index === 4) return '/singles/Bayavuma.jpeg';

  if (index === 5) return '/eps/ATT2 Cover.png';

  return '/live-or-die-2-cover.png';

};

  return (

    <main data-theme={theme}>

      <audio

        ref={audioRef}

        preload="metadata"

        onTimeUpdate={handleTimeUpdate}

        onLoadedMetadata={handleLoadedMetadata}

        onDurationChange={handleDurationChange}

        onEnded={handleEnded}

        onPlay={() => setIsAudioPlaying(true)}

        onPause={() => setIsAudioPlaying(false)}

        onError={() => {

          const audio = audioRef.current;

          console.error('THA SOUNDS audio error:', {

            src: audio?.currentSrc,

            code: audio?.error?.code,

            message: audio?.error?.message,

          });

        }}

      />

      <header className="nav shell">

        <div className="brand">

          <strong>THA SOUNDS</strong>

          <span>The House of Audio</span>

        </div>

        <img

          src="/tha-sound-cartoon.png"

          alt="ThaMusiq"

          className="headerLogo"

        />

        <button type="button" className="themeToggle" onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <a href="#upload" className="uploadButton">
          Upload +
        </a>

      </header>

      <section id="sounds" className="sounds shell">
        <div className="musicTools">
          <label className="searchBox">
            <Search size={18} aria-hidden="true" />
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search songs, EPs or artists..." aria-label="Search music" />
            {searchQuery && <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>}
          </label>
          <div className="quickNav" aria-label="Music navigation">
            <a href="#sounds" onClick={() => { setSearchQuery(''); setShowFavorites(false); setSelectedRelease(null); }}>Home</a>
            <button type="button" className={showFavorites ? 'quickNavActive' : ''} onClick={() => { setShowFavorites((value) => !value); setSelectedRelease(null); }}>{showFavorites ? '♥ Favorites' : '♡ Favorites'}</button>
            <a href="#popular" onClick={() => { setSearchQuery(''); setShowFavorites(false); setSelectedRelease(null); }}>Popular</a>
          </div>
        </div>

        <div className="sectionHead">

          <div>

            <h2>Sounds inside.</h2>

          </div>

          <span className="sectionCount">{tracks.length} SOUND</span>

        </div>

        {selectedRelease === null ? (

          <>

            <div className="contentHeadingRow">
              <h2>{showFavorites ? 'Your favorites' : searchQuery ? 'Search results' : 'Singles'}</h2>
              {showFavorites && <span className="smallHint">Saved on this device</span>}
            </div>
            {!searchQuery && !showFavorites && (
              <section id="popular" className="popularPanel">
                <div className="popularTitle"><BarChart3 size={18} /><h3>Most played on this device</h3></div>
                {[...tracks].map((track, index) => ({ track, index, plays: playCounts[String(index)] ?? 0 })).sort((a, b) => b.plays - a.plays).slice(0, 3).map(({ track, index, plays }) => (
                  <div className="popularRow" key={`popular-${index}`}>
                    <button type="button" onClick={() => openRelease(index)}><span>{track.title}</span><small>{track.artist}</small></button>
                    <span className="playCount">{plays} {plays === 1 ? 'play' : 'plays'}</span>
                    <button type="button" className="popularPlay" aria-label={`Play ${track.title}`} onClick={() => track.type === 'EP' ? playEpTrack(index, 0) : toggleTrack(index)}><Play size={15} fill="currentColor" /></button>
                  </div>
                ))}
              </section>
            )}
            <div className="trackGrid">
              {singleTracks.filter(({ index }) => matchingRelease(index)).map(({ track, index }) => (

                <article className="track" key={track.title}>

                  <button

                    type="button"

                    className="releaseOpen"

                    aria-label={`Open ${track.title}`}

                    onClick={() => openRelease(index)}

                  >

                    <div className="cover" style={{ background: track.cover }}>

                      <div className="coverMark">

                        THA

                        <br />

                        SOUNDS

                      </div>

                      <span className="coverPlay" aria-hidden="true">

                        <Play size={19} fill="currentColor" />

                      </span>

                    </div>

                    <div className="trackName">

                      <div>

                        <h3>{track.title}</h3>

                        <p>{track.artist}</p>

                      </div>

                    </div>

                  </button>
                  <div className="cardUtilityActions">
                    <button type="button" className={`utilityButton ${isFavorite('release:' + index) ? 'isFavorite' : ''}`} onClick={() => toggleFavorite(`release:${index}`)} aria-label={`${isFavorite('release:' + index) ? 'Remove' : 'Add'} ${track.title} ${isFavorite('release:' + index) ? 'from' : 'to'} favorites`}><Heart size={16} fill={isFavorite('release:' + index) ? 'currentColor' : 'none'} /> {isFavorite('release:' + index) ? 'SAVED' : 'SAVE'}</button>
                    <button type="button" className="utilityButton" onClick={() => shareRelease(index)} aria-label={`Share ${track.title}`}><Share2 size={15} /> SHARE</button>
                  </div>

                  <div className="trackMeta">

                    <span>

                      {track.type} · {track.genre}

                    </span>

                    <span className="trackDuration">

                      {likes} {likes === 1 ? 'LIKE' : 'LIKES'} · {track.time}

                    </span>

                    <div className="trackActions">

                      <button

                        type="button"

                        className="streamButton"

                        onClick={() => toggleTrack(index)}

                      >

                        {playing === index && epPlaying === null ? (

                          <Pause size={16} fill="currentColor" />

                        ) : (

                          <Play size={16} fill="currentColor" />

                        )}

                        PLAY

                      </button>

                      <button

                        type="button"

                        className="downloadButton"

                        onClick={() => {

                          const link = document.createElement('a');

                          link.href = track.audio;

                          link.download = track.audio.split('/').pop() || 'ThaMusiq.mp3';

                          document.body.appendChild(link);

                          link.click();

                          link.remove();

                        }}

                      >

                        DOWNLOAD FREE

                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

            <h2>{showFavorites ? 'Favorite EPs & releases' : 'EPs'}</h2>
            <div className="trackGrid">
              {releaseTracks.filter(({ index }) => matchingRelease(index)).map(({ track, index }) => (

                <article className="track" key={track.title}>

                  <button

                    type="button"

                    className="releaseOpen"

                    aria-label={`Open ${track.title}`}

                    onClick={() => openRelease(index)}

                  >

                    <div className="cover" style={{ background: track.cover }}>

                      <div className="coverMark">

                        THA

                        <br />

                        SOUNDS

                      </div>

                      <span className="coverPlay" aria-hidden="true">

                        <Play size={19} fill="currentColor" />

                      </span>

                    </div>

                    <div className="trackName">

                      <div>

                        <h3>{track.title}</h3>

                        <p>{track.artist}</p>

                      </div>

                    </div>

                  </button>
                  <div className="cardUtilityActions">
                    <button type="button" className={`utilityButton ${isFavorite('release:' + index) ? 'isFavorite' : ''}`} onClick={() => toggleFavorite(`release:${index}`)} aria-label={`${isFavorite('release:' + index) ? 'Remove' : 'Add'} ${track.title} ${isFavorite('release:' + index) ? 'from' : 'to'} favorites`}><Heart size={16} fill={isFavorite('release:' + index) ? 'currentColor' : 'none'} /> {isFavorite('release:' + index) ? 'SAVED' : 'SAVE'}</button>
                    <button type="button" className="utilityButton" onClick={() => shareRelease(index)} aria-label={`Share ${track.title}`}><Share2 size={15} /> SHARE</button>
                  </div>

                  <div className="trackMeta">

                    <span>

                      {track.type} · {track.genre}

                    </span>

                    <span className="trackDuration">

                      {likes} {likes === 1 ? 'LIKE' : 'LIKES'}

                    </span>

                    <div className="trackActions">

                      <button

                        type="button"

                        className="streamButton"

                        onClick={() => playEpTrack(index, 0)}

                      >

                        {epReleaseIndex === index &&

                        epPlaying === 0 &&

                        playing === null ? (

                          <Pause size={16} fill="currentColor" />

                        ) : (

                          <Play size={16} fill="currentColor" />

                        )}

                        PLAY

                      </button>

                      <button

                        type="button"

                        className="downloadButton"

                        onClick={() => openRelease(index)}

                      >

                        DOWNLOAD TRACKS

                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>
            {showFavorites && !tracks.some((_, index) => matchingRelease(index)) && <p className="emptyState">{favoriteKeys.length === 0 ? "You haven't saved anything yet. Tap the heart on a release to add it here." : 'No saved releases match this search.'}</p>}
            {!showFavorites && searchQuery && !tracks.some((_, index) => matchingRelease(index)) && <p className="emptyState">No releases found. Try another song, EP or artist name.</p>}

          </>

        ) : (

          <div className="releaseDetail">

            <button

              type="button"

              className="backButton"

              onClick={() => { setSelectedRelease(null); window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#sounds`); }}

            >

              ← BACK TO RELEASES

            </button>

            <div className="releaseDetailHeader">

              <div className="releaseDetailCover">

                <img

                  src={releaseCover(selectedRelease)}

                  alt={`${tracks[selectedRelease].title} cover`}

                />

              </div>

              <div>

                <span className="eyebrow">

                  {tracks[selectedRelease].type} ·{' '}

                  {tracks[selectedRelease].genre}

                </span>

                <h2>{tracks[selectedRelease].title}</h2>

                <p>ThaMusiq</p>

                <p>
                  {tracks[selectedRelease].type === 'EP' ? `${epTracklists[selectedRelease].length} tracks` : '1 track'}
                </p>
                <div className="detailActions">
                  <button type="button" className={`utilityButton ${isFavorite('release:' + selectedRelease) ? 'isFavorite' : ''}`} onClick={() => toggleFavorite(`release:${selectedRelease}`)}><Heart size={16} fill={isFavorite('release:' + selectedRelease) ? 'currentColor' : 'none'} /> {isFavorite('release:' + selectedRelease) ? 'SAVED' : 'SAVE RELEASE'}</button>
                  <button type="button" className="utilityButton" onClick={() => shareRelease(selectedRelease)}><Share2 size={15} /> SHARE RELEASE</button>
                </div>
              </div>
            </div>

            <div className="epTracklist">

              <h3>TRACKLIST</h3>

              {tracks[selectedRelease].type === 'EP' ? (

                epTracklists[selectedRelease].map((song, index) => {

                  const isActive =

                    epReleaseIndex === selectedRelease &&

                    epPlaying === index &&

                    playing === null;

                  return (

                    <div className="epTrackRow" key={song.audio}>

                      <button

                        type="button"

                        className={`epTrack ${isActive ? 'isPlaying' : ''}`}

                        onClick={() => playEpTrack(selectedRelease, index)}

                      >

                        <span>{String(index + 1).padStart(2, '0')}</span>

                        <span>{song.title}</span>

                        {isActive ? (

                          <Pause size={16} />

                        ) : (

                          <Play size={16} />

                        )}

                      </button>

                      <div className="epTrackSideActions">
                        <button type="button" className={`epFavoriteButton ${isFavorite('ep:' + selectedRelease + ':' + index) ? 'isFavorite' : ''}`} onClick={() => toggleFavorite(`ep:${selectedRelease}:${index}`)} aria-label={`${isFavorite('ep:' + selectedRelease + ':' + index) ? 'Remove' : 'Add'} ${song.title} ${isFavorite('ep:' + selectedRelease + ':' + index) ? 'from' : 'to'} favorites`}><Heart size={15} fill={isFavorite('ep:' + selectedRelease + ':' + index) ? 'currentColor' : 'none'} /></button>
                        <a className="epTrackDownload" href={song.audio} download aria-label={`Download ${song.title}`}>DOWNLOAD FREE</a>
                      </div>

                    </div>

                  );

                })

              ) : (

                <button

                  type="button"

                  className={`epTrack ${

                    playing === selectedRelease && epPlaying === null

                      ? 'isPlaying'

                      : ''

                  }`}

                  onClick={() => toggleTrack(selectedRelease)}

                >

                  <span>01</span>

                  <span>{tracks[selectedRelease].title}</span>

                  {playing === selectedRelease && epPlaying === null ? (

                    <Pause size={16} />

                  ) : (

                    <Play size={16} />

                  )}

                </button>

              )}

            </div>

          </div>

        )}

      </section>

      <footer className="footer shell">
        <div><strong>THA SOUNDS</strong><span>The House of Audio</span></div>
        <span>© 2026 THA SOUNDS</span>
      </footer>

      <nav className="mobileBottomNav" aria-label="Mobile navigation">
        <a href="#sounds" onClick={() => { setSearchQuery(''); setSelectedRelease(null); setShowFavorites(false); }}><Play size={17} /><span>Home</span></a>
        <button type="button" onClick={() => { setShowFavorites((value) => !value); setSelectedRelease(null); }} className={showFavorites ? 'active' : ''}><Heart size={17} /><span>Favorites</span></button>
        <a href="#popular" onClick={() => { setSearchQuery(''); setShowFavorites(false); setSelectedRelease(null); }}><BarChart3 size={17} /><span>Popular</span></a>
        <button type="button" onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}><Sun size={17} /><span>{theme === 'light' ? 'Dark' : 'Light'}</span></button>
      </nav>

      {currentTrack && (

        <div className="player">

          <div className="playerProgress">

            <span className="playerTime">{formatTime(progress)}</span>

            <input

              type="range"

              className="progressControl"

              min={0}

              max={duration > 0 ? duration : 100}

              step={0.1}

              value={Math.min(progress, duration || 0)}

              onPointerDown={() => {

                isSeeking.current = true;

              }}

              onChange={(event) => {

                const value = Number(event.currentTarget.value);

                setProgress(value);

                // Seek while dragging so mouse, touch, and keyboard behave consistently.

                seek(value);

              }}

              onPointerUp={(event) => {

                seek(Number(event.currentTarget.value));

                isSeeking.current = false;

              }}

              onPointerCancel={() => {

                isSeeking.current = false;

              }}

              onKeyUp={(event) => {

                seek(Number(event.currentTarget.value));

                isSeeking.current = false;

              }}

              disabled={duration <= 0}

              aria-label="Song progress"

            />

            <span className="playerTime">{formatTime(duration)}</span>

          </div>

          <div className="playerMain">

            <div className="now">

              <div

                className="nowArt"

                style={{ background: currentTrack.cover }}

              />

              <div className="nowText">

                <b>{currentTrack.title}</b>

                <span>{currentTrack.artist}</span>

              </div>

            </div>

            <div className="playerControls">

              <button

                type="button"

                className={`transportButton ${shuffle ? 'shuffleOn' : ''}`}

                aria-label="Toggle shuffle"

                title="Shuffle"

                onClick={() => setShuffle((value) => !value)}

              >

                <Shuffle size={18} />

              </button>

              <button

                type="button"

                className="transportButton"

                aria-label="Previous song"

                title="Previous song"

                onClick={playPrevious}

              >

                <SkipBack size={19} fill="currentColor" />

              </button>

              <button

                type="button"

                className="nowPlay"

                aria-label="Play or pause"

                title="Play or pause"

                onClick={() => {

                  if (!audioRef.current) return;

                  if (audioRef.current.paused) {

                    audioRef.current.play().catch(() => {});

                  } else {

                    audioRef.current.pause();

                  }

                }}

              >

                {isAudioPlaying ? (

                  <Pause size={19} fill="currentColor" />

                ) : (

                  <Play size={19} fill="currentColor" />

                )}

              </button>

              <button

                type="button"

                className="transportButton"

                aria-label="Next song"

                title="Next song"

                onClick={playNext}

              >

                <SkipForward size={19} fill="currentColor" />

              </button>

            </div>

            <div className="playerExtras">

              <Volume2 size={18} className="volume" />

              <input

                className="volumeControl"

                type="range"

                min="0"

                max="1"

                step="0.01"

                value={volume}

                onChange={(event) => setVolume(Number(event.target.value))}

                aria-label="Volume"

              />

            </div>

          </div>

        </div>

      )}

      <style jsx global>{`

        .player {

          position: fixed;

          z-index: 1000;

          left: 0;

          right: 0;

          bottom: 0;

          display: flex;

          flex-direction: column;

          gap: 6px;

          padding: 6px 24px calc(8px + env(safe-area-inset-bottom, 0px));

          background: rgba(248, 247, 243, 0.98);

          color: #171717;

          border-top: 1px solid rgba(0, 0, 0, 0.12);

          box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);

        }

        .playerProgress {

          display: grid;

          grid-template-columns: 56px minmax(0, 1fr) 56px;

          align-items: center;

          gap: 12px;

          width: 100%;

        }

        .playerTime {

          font-size: 12px;

          line-height: 1;

          font-variant-numeric: tabular-nums;

          text-align: center;

          white-space: nowrap;

          color: #333;

        }

        .progressControl {

          width: 100%;

          min-width: 0;

          accent-color: #d94816;

          cursor: pointer;

        }

        .playerMain {

          display: grid;

          grid-template-columns: minmax(220px, 1fr) minmax(250px, 1fr) minmax(160px, 1fr);

          align-items: center;

          gap: 20px;

          min-height: 66px;

        }

        .player .now {

          display: flex;

          align-items: center;

          gap: 14px;

          min-width: 0;

        }

        .player .nowArt {

          width: 52px;

          height: 52px;

          flex: 0 0 52px;

          border-radius: 4px;

          background-position: center !important;

          background-size: cover !important;

        }

        .player .nowText {

          display: flex;

          flex-direction: column;

          gap: 5px;

          min-width: 0;

        }

        .player .nowText b {

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;

          font-size: 15px;

        }

        .player .nowText span {

          color: #686868;

          font-size: 13px;

        }

        .playerControls {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 20px;

        }

        .player .transportButton,

        .player .nowPlay {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          flex: 0 0 auto;

          border: 0;

          background: transparent;

          color: #171717;

          cursor: pointer;

        }

        .player .transportButton {

          width: 34px;

          height: 38px;

          padding: 0;

        }

        .player .nowPlay {

          width: 54px;

          height: 54px;

          border: 4px solid #d94816;

          border-radius: 50%;

          background: #fff;

        }

        .player .shuffleOn {

          color: #d94816;

        }

        .playerExtras {

          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 10px;

        }

        .player .volume {

          flex: 0 0 auto;

        }

        .player .volumeControl {

          width: 110px;

          accent-color: #d94816;

          cursor: pointer;

        }

        @media (max-width: 700px) {

          .player {

            gap: 4px;

            padding: 5px 10px 6px;

            bottom: 0;

            padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));

          }

          .playerProgress {

            grid-template-columns: 42px minmax(0, 1fr) 42px;

            gap: 6px;

          }

          .playerMain {

            grid-template-columns: minmax(0, 1fr) auto;

            gap: 8px;

          }

          .player .nowArt {

            width: 42px;

            height: 42px;

            flex-basis: 42px;

          }

          .player .nowText b {

            font-size: 12px;

          }

          .player .nowText span {

            font-size: 11px;

          }

          .playerControls {

            gap: 5px;

          }

          .player .transportButton {

            width: 28px;

          }

          .player .nowPlay {

            width: 42px;

            height: 42px;

            border-width: 3px;

          }

          .playerExtras {

            display: none;

          }

        }

        .trackGrid {

          display: grid;

          grid-template-columns: repeat(5, minmax(0, 1fr));

          gap: 14px;

          align-items: stretch;

        }

        .track {

          min-width: 0;

          display: flex;

          flex-direction: column;

          height: 100%;

        }

        .releaseOpen {

          display: flex;

          flex-direction: column;

          width: 100%;

          height: 100%;

          text-align: left;

        }

        .cover {

          width: 100%;

          aspect-ratio: 1 / 1;

          height: auto;

          flex: 0 0 auto;

          background-size: cover !important;

          background-position: center !important;

        }

        .trackName {

          min-height: 76px;

        }

        .trackMeta {

          display: flex;

          flex-direction: column;

          gap: 10px;

          margin-top: auto;

        }

        .trackDuration {

          display: block;

        }

        .trackActions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
}

.trackActions .downloadButton {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 36px;
  min-height: 36px;
  padding: 0 2px;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.streamButton {
  /* Uses the shared button styling above */
}

.trackActions .downloadButton {
  /* Uses the shared button styling above */
}

        .streamButton {

          border: 1px solid currentColor;

          border-radius: 999px;

          background: transparent;

          color: inherit;

          padding: 10px 14px;

          font-weight: 700;

          cursor: pointer;

        }

        .trackActions .downloadButton {

          width: 100%;

          padding: 8px 8px;

          min-height: 34px;

          border: 1px solid currentColor;

          border-radius: 999px;

          background: transparent;

          color: inherit;

          font-size: 11px;

          font-weight: 700;

          cursor: pointer;

        }

        @media (max-width: 800px) {

          .trackGrid {

            grid-template-columns: repeat(2, minmax(0, 1fr));

          }

        }

        @media (max-width: 520px) {

          .trackGrid {

            grid-template-columns: 1fr;

          }

        }

        .nav {

          display: flex;

          align-items: center;

          gap: 14px;

        }

        .headerLogo {

          width: 48px;

          height: 48px;

          object-fit: contain;

          flex-shrink: 0;

        }

        .nav .uploadButton {

          margin-left: auto;

          flex-shrink: 0;

          text-decoration: none;

          background: #c9ff45;

          color: #111;

          padding: 10px 18px;

          border-radius: 999px;

          font-weight: 700;

        }

        /* Album / playlist view */

        .releaseDetail {

          width: 100%;

          max-width: 1000px;

          margin: 0 auto;

          padding-bottom: 120px;

        }

        .releaseDetail .backButton {

          margin-bottom: 24px;

        }

        .releaseDetailHeader {

          display: flex;

          align-items: end;

          gap: 28px;

          padding: 28px;

          border-radius: 18px 18px 0 0;

          background: linear-gradient(

            135deg,

            rgba(201, 255, 69, 0.16),

            rgba(20, 20, 20, 0.04)

          );

        }

        .releaseDetailCover {

          width: 190px;

          height: 190px;

          flex: 0 0 190px;

          overflow: hidden;

          border-radius: 8px;

          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);

        }

        .releaseDetailCover img {

          display: block;

          width: 100%;

          height: 100%;

          object-fit: cover;

        }

        .releaseDetailHeader h2 {

          margin: 8px 0;

          font-size: clamp(28px, 4vw, 48px);

          line-height: 1.05;

        }

        .releaseDetailHeader p {

          margin: 6px 0;

        }

        .epTracklist {

          padding: 20px 28px 28px;

          border-radius: 0 0 18px 18px;

          background: rgba(255, 255, 255, 0.025);

        }

        .epTracklist h3 {

          margin: 0 0 12px;

          font-size: 12px;

          letter-spacing: 0.14em;

          opacity: 0.65;

        }

        .epTrackRow {

          display: grid;

          grid-template-columns: minmax(0, 1fr) auto;

          align-items: center;

          gap: 10px;

          border-bottom: 1px solid rgba(255, 255, 255, 0.09);

        }

        .epTrackDownload {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          min-height: 34px;

          padding: 6px 10px;

          border: 1px solid currentColor;

          border-radius: 999px;

          color: inherit;

          text-decoration: none;

          font-size: 10px;

          font-weight: 700;

          white-space: nowrap;

        }

        .epTrackDownload:hover {

          color: #c9ff45;

        }

        .epTrack {

          display: grid;

          grid-template-columns: 34px minmax(0, 1fr) 28px;

          align-items: center;

          gap: 14px;

          width: 100%;

          min-height: 54px;

          padding: 10px 12px;

          border: 0;

          border-bottom: 0;

          border-radius: 6px;

          background: transparent;

          color: inherit;

          text-align: left;

          cursor: pointer;

        }

        .epTrack > span:first-child {

          opacity: 0.65;

          font-variant-numeric: tabular-nums;

          text-align: center;

        }

        .epTrack > span:nth-child(2) {

          min-width: 0;

          overflow-wrap: anywhere;

        }

        .epTrack > :last-child {

          justify-self: center;

        }

        .epTrack:hover,

        .epTrack.isPlaying {

          background: rgba(201, 255, 69, 0.09);

        }

        .epTrack.isPlaying > span:first-child,

        .epTrack.isPlaying > span:nth-child(2) {

          color: #c9ff45;

        }

        @media (max-width: 600px) {

          .releaseDetailHeader {

            align-items: center;

            gap: 16px;

            padding: 18px 14px;

          }

          .releaseDetailCover {

            width: 120px;

            height: 120px;

            flex-basis: 120px;

          }

          .releaseDetailHeader h2 {

            font-size: 25px;

            overflow-wrap: anywhere;

          }

          .epTracklist {

            padding: 18px 10px 24px;

          }

          .epTrack {

            gap: 8px;

            padding: 10px 6px;

          }

          .epTrackRow {

            gap: 6px;

          }

          .epTrackDownload {

            padding: 6px 7px;

            font-size: 9px;

          }

        }


        /* THA SOUNDS mobile optimisation: overrides only, desktop styling stays intact */
        @media (max-width: 700px) {
          html,
          body {
            max-width: 100%;
            overflow-x: hidden;
          }

          main {
            width: 100%;
            overflow-x: clip;
          }

          .shell {
            width: 100%;
            max-width: 100%;
            padding-left: 16px;
            padding-right: 16px;
          }

          .nav {
            flex-wrap: nowrap;
            gap: 10px;
            padding-top: 14px;
            padding-bottom: 14px;
          }

          .brand {
            min-width: 0;
          }

          .brand strong {
            font-size: clamp(17px, 5vw, 22px);
            line-height: 1.05;
          }

          .brand span {
            font-size: 10px;
          }

          .headerLogo {
            width: 38px;
            height: 38px;
          }

          .nav .uploadButton {
            padding: 9px 12px;
            font-size: 12px;
          }

          .sounds {
            padding-top: 16px;
          }

          .sectionHead {
            gap: 10px;
            align-items: center;
          }

          .sectionHead h2 {
            font-size: clamp(24px, 7vw, 34px);
          }

          .sectionCount {
            flex-shrink: 0;
            font-size: 10px;
          }

          .trackGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .track {
            min-width: 0;
          }

          .cover {
            width: 100%;
            aspect-ratio: 1 / 1;
          }

          .trackName {
            min-height: 0;
            padding: 10px 0 6px;
          }

          .trackName h3 {
            font-size: 14px;
            line-height: 1.25;
            overflow-wrap: anywhere;
          }

          .trackName p {
            font-size: 12px;
            line-height: 1.35;
          }

          .trackMeta {
            gap: 8px;
          }

          .trackMeta > span {
            font-size: 10px;
            line-height: 1.4;
            overflow-wrap: anywhere;
          }

          .trackActions {
            grid-template-columns: minmax(0, 1fr);
            gap: 7px;
          }

          .trackActions .streamButton,
          .trackActions .downloadButton {
            min-height: 38px;
            height: auto;
            padding: 8px 6px;
            font-size: 10px;
            white-space: normal;
          }

          .releaseDetail {
            padding-bottom: 24px;
          }

          .releaseDetailHeader {
            align-items: flex-start;
            gap: 14px;
            padding: 16px 12px;
          }

          .releaseDetailCover {
            width: min(34vw, 130px);
            height: min(34vw, 130px);
            flex: 0 0 min(34vw, 130px);
          }

          .releaseDetailHeader > div {
            min-width: 0;
          }

          .releaseDetailHeader h2 {
            font-size: clamp(20px, 6vw, 27px);
            line-height: 1.12;
            overflow-wrap: anywhere;
          }

          .releaseDetailHeader p {
            font-size: 12px;
            line-height: 1.4;
          }

          .epTracklist {
            padding: 16px 8px 20px;
          }

          .epTrackRow {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 6px;
          }

          .epTrack {
            grid-template-columns: 24px minmax(0, 1fr) 22px;
            gap: 7px;
            min-width: 0;
            min-height: 50px;
            padding: 9px 4px;
            font-size: 13px;
          }

          .epTrack > span:nth-child(2) {
            overflow-wrap: anywhere;
          }

          .epTrackDownload {
            max-width: 92px;
            min-height: 34px;
            padding: 5px 6px;
            font-size: 9px;
            white-space: normal;
            text-align: center;
          }

          .footer {
            gap: 12px;
            flex-wrap: wrap;
            padding-top: 20px;
            padding-bottom: 24px;
            font-size: 11px;
          }

          .footer > span {
            overflow-wrap: anywhere;
          }

          /* Keep page content scrollable above the fixed player. */
          main:has(.player) {
            padding-bottom: 118px;
          }

          .player {
            left: 0;
            right: 0;
            bottom: 0;
            gap: 4px;
            padding: 6px 10px calc(8px + env(safe-area-inset-bottom, 0px));
            border-radius: 12px 12px 0 0;
          }

          .playerProgress {
            grid-template-columns: 34px minmax(0, 1fr) 34px;
            gap: 5px;
          }

          .playerTime {
            font-size: 10px;
          }

          .progressControl {
            min-height: 22px;
            touch-action: pan-x;
          }

          .playerMain {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 6px;
            min-height: 44px;
          }

          .player .now {
            gap: 8px;
            min-width: 0;
          }

          .player .nowArt {
            width: 40px;
            height: 40px;
            flex-basis: 40px;
          }

          .player .nowText {
            gap: 3px;
          }

          .player .nowText b {
            max-width: 34vw;
            font-size: 11px;
            line-height: 1.2;
          }

          .player .nowText span {
            font-size: 10px;
          }

          .playerControls {
            gap: 2px;
          }

          .player .transportButton {
            width: 27px;
            height: 40px;
          }

          .player .transportButton svg {
            width: 16px;
            height: 16px;
          }

          .player .nowPlay {
            width: 38px;
            height: 38px;
            border-width: 3px;
          }

          .player .nowPlay svg {
            width: 17px;
            height: 17px;
          }

          .playerExtras {
            display: none;
          }
        }

        @media (max-width: 360px) {
          .shell {
            padding-left: 12px;
            padding-right: 12px;
          }

          .nav {
            gap: 7px;
          }

          .headerLogo {
            width: 32px;
            height: 32px;
          }

          .nav .uploadButton {
            padding: 8px 9px;
            font-size: 11px;
          }

          .trackGrid {
            gap: 9px;
          }

          .player {
            padding-left: 7px;
            padding-right: 7px;
          }

          .player .nowArt {
            width: 35px;
            height: 35px;
            flex-basis: 35px;
          }

          .player .nowText b {
            max-width: 30vw;
            font-size: 10px;
          }

          .playerControls {
            gap: 0;
          }

          .player .transportButton {
            width: 24px;
          }

          .player .nowPlay {
            width: 35px;
            height: 35px;
          }
        }

        /* New THA SOUNDS features */
        .musicTools { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 14px; align-items: center; margin: 18px 0 28px; }
        .searchBox { display: flex; align-items: center; gap: 10px; min-width: 0; border: 1px solid rgba(128,128,128,.45); border-radius: 999px; padding: 0 14px; min-height: 46px; }
        .searchBox input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: inherit; font: inherit; }
        .searchBox button { border: 0; background: transparent; color: inherit; font-size: 22px; cursor: pointer; }
        .quickNav { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .quickNav a, .quickNav button { border: 1px solid rgba(128,128,128,.4); border-radius: 999px; padding: 10px 13px; background: transparent; color: inherit; text-decoration: none; font: inherit; font-size: 12px; cursor: pointer; }
        .quickNav .quickNavActive { background: #c9ff45; color: #111; border-color: #c9ff45; }
        .themeToggle { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border: 1px solid rgba(128,128,128,.4); border-radius: 50%; background: transparent; color: inherit; cursor: pointer; }
        .contentHeadingRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .smallHint { font-size: 11px; opacity: .65; }
        .cardUtilityActions, .detailActions { display: flex; flex-wrap: wrap; gap: 7px; margin: 4px 0 10px; }
        .utilityButton, .epFavoriteButton { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid rgba(128,128,128,.45); border-radius: 999px; padding: 7px 10px; background: transparent; color: inherit; font-size: 10px; font-weight: 700; cursor: pointer; }
        .utilityButton.isFavorite, .epFavoriteButton.isFavorite { color: #d94865; border-color: currentColor; }
        .detailActions { margin-top: 14px; }
        .epTrackSideActions { display: flex; align-items: center; gap: 5px; }
        .epFavoriteButton { width: 32px; height: 32px; padding: 0; flex-shrink: 0; }
        .emptyState { padding: 22px 0; opacity: .7; }
        .popularPanel { margin: 0 0 30px; padding: 16px; border: 1px solid rgba(128,128,128,.25); border-radius: 16px; }
        .popularTitle { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .popularTitle h3 { margin: 0; font-size: 15px; }
        .popularRow { display: grid; grid-template-columns: minmax(0,1fr) auto auto; gap: 12px; align-items: center; padding: 10px 0; border-top: 1px solid rgba(128,128,128,.18); }
        .popularRow > button:first-child { display: flex; flex-direction: column; gap: 3px; min-width: 0; text-align: left; border: 0; background: transparent; color: inherit; cursor: pointer; }
        .popularRow > button:first-child span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; }
        .popularRow small, .playCount { font-size: 11px; opacity: .7; }
        .popularPlay { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
        .mobileBottomNav { display: none; }
        main { padding-bottom: 24px; }
        main[data-theme='dark'] { min-height: 100vh; background: #101010; color: #f5f5f5; }
        main[data-theme='dark'] .player { background: rgba(24,24,24,.98); color: #f5f5f5; border-top-color: rgba(255,255,255,.15); }
        main[data-theme='dark'] .player .transportButton, main[data-theme='dark'] .player .nowPlay { color: #f5f5f5; }
        main[data-theme='dark'] .player .nowPlay { background: #222; }
        main[data-theme='dark'] .playerTime { color: #ddd; }
        main[data-theme='dark'] .player .nowText span { color: #bbb; }
        main[data-theme='dark'] .epTracklist { background: rgba(255,255,255,.035); }
        main[data-theme='dark'] .releaseDetailHeader { background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.015)); }
        main[data-theme='dark'] .mobileBottomNav { background: rgba(18,18,18,.98); border-color: rgba(255,255,255,.15); }
        @media (max-width: 700px) {
          .musicTools { grid-template-columns: minmax(0,1fr); gap: 10px; margin: 14px 0 22px; }
          .quickNav { display: none; }
          .mobileBottomNav { position: fixed; z-index: 999; left: 10px; right: 10px; bottom: calc(112px + env(safe-area-inset-bottom, 0px)); display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 3px; padding: 7px 4px; border: 1px solid rgba(0,0,0,.12); border-radius: 16px; background: rgba(250,249,246,.97); color: #171717; box-shadow: 0 5px 22px rgba(0,0,0,.12); }
          .mobileBottomNav a, .mobileBottomNav button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-width: 0; min-height: 42px; border: 0; border-radius: 10px; background: transparent; color: inherit; text-decoration: none; font: inherit; font-size: 10px; cursor: pointer; }
          .mobileBottomNav .active { color: #d94865; }
          main:has(.player) { padding-bottom: 174px; }
          .cardUtilityActions { gap: 5px; }
          .utilityButton { padding: 7px 8px; font-size: 9px; }
          .popularPanel { padding: 12px; }
          .popularRow { gap: 7px; }
          .playCount { font-size: 10px; }
          .detailActions { gap: 6px; }
        }
        @media (max-width: 360px) {
          .mobileBottomNav { left: 5px; right: 5px; }
          .popularRow { grid-template-columns: minmax(0,1fr) auto; }
          .popularPlay { display: none; }
        }

      `}</style>

    </main>

  );

}


