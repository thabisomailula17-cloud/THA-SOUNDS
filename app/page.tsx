  'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Upload,
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
    title: "Bayavuma (ThaMusiq's Amapiano Remix)",
    artist: 'ThaMusiq',
    genre: 'Amapiano',
    type: 'Single',
    time: '8:38',
    cover: "url('/singles/Bayavuma.jpeg') center/cover",
    audio: "/singles/Bayavuma (ThaMusiq's Amapiano Remix).mp3",
  },
];
const epTracks = [
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
];
export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
const isSeeking = useRef(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const [epPlaying, setEpPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEP, setShowEP] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<number | null>(null);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);

const [liked, setLiked] = useState(false);
const [likes, setLikes] = useState(0);

  const currentTrack =
    epPlaying !== null
      ? {
          ...epTracks[epPlaying],
          artist: 'ThaMusiq',
          cover: "url('/eps/0916 II Cover.png') center/cover",
        }
      : playing !== null
        ? tracks[playing]
        : null;

useEffect(() => {
  if (!audioRef.current || !currentTrack) return;

  audioRef.current.src = currentTrack.audio;
  audioRef.current.volume = volume;
  audioRef.current.load();

  audioRef.current.play().catch(() => {});
}, [playing, epPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleTrack = (index: number) => {
    if (!audioRef.current) return;
setEpPlaying(null);
    if (playing === index) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
      return;
    }

    setProgress(0);
    setPlaying(index);
  };

  

const handleTimeUpdate = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    setDuration(audio.duration);
  }

  if (isSeeking.current) return;

  setProgress(audio.currentTime);
};

  const handleLoadedMetadata = () => {
  const audio = audioRef.current;
  if (!audio) return;

  console.log("Audio duration:", audio.duration);
  setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
};

const playNext = () => {
  setProgress(0);
  if (epPlaying !== null) {
    let next = shuffle
      ? Math.floor(Math.random() * epTracks.length)
      : (epPlaying + 1) % epTracks.length;
    if (shuffle && epTracks.length > 1 && next === epPlaying) next = (next + 1) % epTracks.length;
    setPlaying(null);
    setEpPlaying(next);
    return;
  }
  if (playing !== null) {
    const list = tracks.map((_, i) => i).filter(i => i !== 1);
    let position = list.indexOf(playing);
    let next = shuffle ? list[Math.floor(Math.random() * list.length)] : list[(position + 1) % list.length];
    if (shuffle && list.length > 1 && next === playing) next = list[(list.indexOf(next) + 1) % list.length];
    setEpPlaying(null);
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
    setPlaying(null);
    setEpPlaying((epPlaying - 1 + epTracks.length) % epTracks.length);
    return;
  }
  if (playing !== null) {
    const list = tracks.map((_, i) => i).filter(i => i !== 1);
    const position = list.indexOf(playing);
    setEpPlaying(null);
    setPlaying(list[(position - 1 + list.length) % list.length]);
  }
};

const handleEnded = () => playNext();

const seek = (value: number) => {
  const audio = audioRef.current;

  if (!audio || audio.readyState < 1) return;

  const newTime = Math.max(
    0,
    Math.min(value, audio.duration)
  );

  console.log("Seeking to:", newTime);
  console.log("Duration:", audio.duration);

  audio.currentTime = newTime;
setProgress(newTime);

setTimeout(() => {
  console.log("Time after 1 second:", audio.currentTime);
  console.log("Audio source:", audio.currentSrc);
}, 1000);
};
  
  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${remaining
      .toString()
      .padStart(2, '0')}`;
  };

  return (

    <main>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
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

  <a href="#upload" className="uploadButton">
    Upload +
  </a>
</header>

      <section className="hero shell">
        <div className="heroCopy">
          <span className="eyebrow">THA SOUNDS</span>

          <h1>
            home of
            <br />
            <i>music.</i>
          </h1>

          <p>
            A house for sounds, artists and everything
            in between.
          </p>

          <a href="#sounds" className="heroButton">
            ENTER THE HOUSE
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="heroImage">
          <img
            src="/tha-sound-cartoon.png"
            alt="ThaMusiq"
          />
        </div>
      </section>

      <section id="sounds" className="sounds shell">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">01 / SOUNDS</span>
            <h2>Sounds inside.</h2>
          </div>

          <span className="sectionCount">
            {tracks.length} SOUND
          </span>
        </div>

        {selectedRelease === null ? (
          <div className="trackGrid">
            {tracks.map((track, index) => (
              <article className="track" key={track.title}>
                <button
                  type="button"
                  className="releaseOpen"
                  aria-label={`Open ${track.title}`}
                  onClick={() => setSelectedRelease(index)}
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

                <div className="trackMeta">
                  <span>{track.type} · {track.genre}</span>
                  <div>
                    <span>
                      {likes} {likes === 1 ? 'LIKE' : 'LIKES'} · {track.time}
                    </span>
                    <button
                      type="button"
                      className="likeButton"
                      aria-label="Like release"
                      onClick={() => {
                        setLiked(!liked);
                        setLikes(liked ? likes - 1 : likes + 1);
                      }}
                    >
                      <Heart size={18} fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button
                      type="button"
                      className="downloadButton"
                      onClick={() => {
                        window.location.href =
                          'https://tha-sounds-payments.thabisomailula17.workers.dev/checkout';
                      }}
                    >
                      DOWNLOAD · R10
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="releaseDetail">
            <button
              type="button"
              className="backButton"
              onClick={() => setSelectedRelease(null)}
            >
              ← BACK TO RELEASES
            </button>

            <div className="releaseDetailHeader">
              <div className="releaseDetailCover">
                <img
                  src={selectedRelease === 1 ? '/eps/0916 II Cover.png' : selectedRelease === 0 ? '/live-or-die-2-cover.png' : '/singles/Bayavuma.jpeg'}
                  alt={`${tracks[selectedRelease].title} cover`}
                />
              </div>
              <div>
                <span className="eyebrow">
                  {tracks[selectedRelease].type} · {tracks[selectedRelease].genre}
                </span>
                <h2>{tracks[selectedRelease].title}</h2>
                <p>ThaMusiq</p>
                <p>
                  {selectedRelease === 1
                    ? `${epTracks.length} tracks`
                    : '1 track'}
                </p>
              </div>
            </div>

            <div className="epTracklist">
              <h3>TRACKLIST</h3>
              {selectedRelease === 1 ? (
                epTracks.map((song, index) => (
                  <button
                    type="button"
                    key={song.title}
                    className={`epTrack ${epPlaying === index ? 'isPlaying' : ''}`}
                    onClick={() => {
                      setProgress(0);
                      setPlaying(null);
                      setEpPlaying(index);
                    }}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{song.title}</span>
                    {epPlaying === index ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  className="epTrack"
                  onClick={() => {
                    setProgress(0);
                    setEpPlaying(null);
                    setPlaying(selectedRelease);
                  }}
                >
                  <span>01</span>
                  <span>{tracks[selectedRelease].title}</span>
                  {playing === selectedRelease ? (
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

      <section id="artists" className="people shell">
        <div className="peopleIntro">
          <span className="eyebrow">02 / THE HOUSE</span>

          <h2>
            Good music
            <br />
            <i>lives here.</i>
          </h2>

          <p>
            ThaMusiq is at the front of the house.
            Everyone else is welcome through the door.
          </p>
        </div>

        <div className="peopleList">
          <div className="person featured">
            <b>01</b>
            <strong>ThaMusiq</strong>
            <small>Founder · Amapiano</small>
            <ArrowUpRight size={17} />
          </div>
        </div>
      </section>

      <section id="upload" className="drop shell">
        <div className="dropInner">
          <span>YOUR TURN</span>

          <h2>
            Bring something
            <br />
            to the house.
          </h2>

          <p>
            Artists, producers and creators —
            this house is open.
          </p>

          <button className="uploadButton">
            <Upload size={17} />
            SEND YOUR SOUND
          </button>
        </div>
      </section>

      <footer className="footer shell">
        <div>
          <strong>THA SOUNDS</strong>
          <span>The House of Audio</span>
        </div>

        <i>home of music</i>

        <span>© 2026 THA SOUNDS</span>
      </footer>

      {currentTrack && (
        <div className="player">
          <div className="now">
            <div
              className="nowArt"
              style={{
                background: currentTrack.cover,
              }}
            />

            <div>
              <b>{currentTrack.title}</b>
              <span>{currentTrack.artist}</span>
            </div>
          </div>

          <button type="button" className="transportButton" aria-label="Previous song" title="Previous song" onClick={playPrevious}>
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button
            className="nowPlay"
            aria-label="Play or pause"
            onClick={() => {
              if (!audioRef.current) return;

              if (audioRef.current.paused) {
                audioRef.current.play().catch(() => {});
              } else {
                audioRef.current.pause();
              }
            }}
          >
            {audioRef.current &&
            !audioRef.current.paused ? (
              <Pause size={17} fill="currentColor" />
            ) : (
              <Play size={17} fill="currentColor" />
            )}
          </button>

         

<button type="button" className={`transportButton ${shuffle ? 'shuffleOn' : ''}`} aria-label="Toggle shuffle" title="Shuffle" onClick={() => setShuffle(value => !value)}>
            <Shuffle size={18} />
          </button>
          <button type="button" className="transportButton" aria-label="Next song" title="Next song" onClick={playNext}>
            <SkipForward size={18} fill="currentColor" />
          </button>

<div className="bar">
  

<input
  type="range"
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
  }}
  onPointerUp={(event) => {
    const value = Number(event.currentTarget.value);
    seek(value);
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

</div>

          <span className="playerTime">
            {formatTime(progress)} / {formatTime(duration)}
          </span>

          <Volume2 size={16} className="volume" />

          <input
            className="volumeControl"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(Number(event.target.value))
            }
            aria-label="Volume"
          />
        </div>
      )}
      <style jsx global>{`
        .trackGrid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:24px; }
        .track { min-width:0; padding:0 0 18px; border-bottom:1px solid rgba(255,255,255,.18); }
        .releaseOpen { display:block; width:100%; text-align:left; border:0; background:transparent; color:inherit; cursor:pointer; }
        .cover { position:relative; aspect-ratio:1/1; overflow:hidden; border-radius:12px; }
        .coverMark { position:absolute; left:14px; bottom:14px; font-weight:900; letter-spacing:.08em; text-shadow:0 2px 10px #000; }
        .coverPlay { position:absolute; right:14px; bottom:14px; display:grid; place-items:center; width:42px; height:42px; border-radius:50%; background:#c9ff45; color:#101010; }
        .trackName { padding-top:13px; }
        .trackMeta { display:flex; flex-direction:column; gap:10px; padding:12px 12px 0; border-top:1px solid rgba(255,255,255,.12); margin-top:12px; }
        .trackMeta > div { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .releaseDetail { margin-top:18px; border:1px solid rgba(255,255,255,.16); border-radius:18px; padding:clamp(16px,3vw,30px); background:rgba(255,255,255,.025); }
        .backButton { background:transparent; color:inherit; border:1px solid rgba(255,255,255,.24); border-radius:999px; padding:10px 15px; cursor:pointer; margin-bottom:24px; }
        .releaseDetailHeader { display:flex; align-items:end; gap:24px; padding-bottom:26px; border-bottom:1px solid rgba(255,255,255,.18); }
        .releaseDetailCover { width:min(220px,38vw); aspect-ratio:1/1; flex-shrink:0; border-radius:12px; overflow:hidden; background:#242424; }
        .releaseDetailCover img { display:block; width:100%; height:100%; object-fit:cover; }
        .epTracklist { margin-top:24px; }
        .epTracklist h3 { font-size:12px; letter-spacing:.16em; opacity:.7; margin:0 0 10px; }
        .epTrack { width:100%; display:grid; grid-template-columns:38px minmax(0,1fr) 24px; gap:12px; align-items:center; text-align:left; padding:15px 12px; border:0; border-bottom:1px solid rgba(255,255,255,.14); color:inherit; background:transparent; cursor:pointer; }
        .epTrack:hover,.epTrack.isPlaying { background:rgba(201,255,69,.09); }
        .epTrack span:first-child { opacity:.65; font-variant-numeric:tabular-nums; }
        .epTrack.isPlaying span:nth-child(2) { color:#c9ff45; }
        .player { display:flex; align-items:center; gap:14px; }
        .transportButton { display:grid; place-items:center; flex-shrink:0; border:0; background:transparent; color:inherit; padding:7px; cursor:pointer; opacity:.82; }
        .transportButton:hover,.transportButton.shuffleOn { color:#c9ff45; opacity:1; }
        .nowPlay { flex-shrink:0; }
        .bar { flex:1; min-width:80px; }
        .bar input[type=range] { width:100%; cursor:pointer; touch-action:pan-y; accent-color:#c9ff45; }
        .volumeControl { accent-color:#c9ff45; }
        @media (max-width:700px) {
          .releaseDetailHeader { align-items:start; gap:15px; }
          .releaseDetailCover { width:38vw; }
          .player { gap:7px; flex-wrap:wrap; }
          .now { flex:1 1 55%; min-width:0; }
          .bar { order:10; flex-basis:100%; }
          .playerTime { font-size:11px; }
          .volumeControl,.volume { display:none; }
        }
      `}</style>
    </main>
  );
}

