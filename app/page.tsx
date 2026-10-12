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

  const audio = audioRef.current;

audio.pause();
audio.src = currentTrack.audio;
audio.volume = volume;
audio.load();

audio.currentTime = 0;
audio.play().catch(() => {});
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
  if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
    return;
  }

  const newTime = Math.max(0, Math.min(value, audio.duration));
console.log("Seek requested:", newTime);
console.log("Seekable ranges:", audio.seekable.length);
  audio.currentTime = newTime;
  setProgress(newTime);
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
  preload="metadata"
  onTimeUpdate={handleTimeUpdate}
  onLoadedMetadata={handleLoadedMetadata}
  onDurationChange={handleDurationChange}
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

      <section id="sounds" className="sounds shell">
        <div className="sectionHead">
          <div>
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
                  <span className="trackDuration">
                    {likes} {likes === 1 ? 'LIKE' : 'LIKES'} · {track.time}
                  </span>
                  <div className="trackActions">
                    <button
                      type="button"
                      className="streamButton"
                      onClick={() => {
                        if (index === 1) {
                          setProgress(0);
                          setPlaying(null);
                          setEpPlaying(0);
                        } else {
                          toggleTrack(index);
                        }
                      }}
                    >
                      <Play size={16} fill="currentColor" />
                      PLAY
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

      <footer className="footer shell">
        <div>
          <strong>THA SOUNDS</strong>
          <span>The House of Audio</span>
        </div>

        <span>© 2026 THA SOUNDS</span>
      </footer>

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

  if (isSeeking.current) {
    seek(value);
  }
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
                onClick={() => setShuffle(value => !value)}
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
                {audioRef.current && !audioRef.current.paused ? (
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
  bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 24px 8px;
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
  bottom: 25px;
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
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .trackActions button {
        
.trackActions button {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 36px;
  min-height: 36px;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 10px;
  line-height: 1;
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
          background: linear-gradient(135deg, rgba(201, 255, 69, 0.16), rgba(20, 20, 20, 0.04));
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

        .epTrack {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr) 28px;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 54px;
          padding: 10px 12px;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
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
        }
      `}</style>
    </main>
  );
}



