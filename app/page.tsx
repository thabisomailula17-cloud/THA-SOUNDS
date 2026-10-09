'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Heart,
  Pause,
  Play,
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
  title: 'Bayavuma (ThaMusiq\'s Amapiano Remix)',
  artist: 'ThaMusiq',
  genre: 'Amapiano',
  type: 'Single',
  time: '8:38',
  cover: "url('/singles/Bayavuma.jpeg') center/cover",
  audio: "/singles/Bayavuma (ThaMusiq's Amapiano Remix).mp3",
},
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

const [liked, setLiked] = useState(false);
const [likes, setLikes] = useState(0);

  const currentTrack =
    playing === null ? null : tracks[playing];

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack.audio;
    audioRef.current.volume = volume;
    audioRef.current.load();

    audioRef.current
      .play()
      .catch(() => {});
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleTrack = (index: number) => {
    if (!audioRef.current) return;

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

  setProgress(audio.currentTime);
  setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
};

  const handleLoadedMetadata = () => {
  const audio = audioRef.current;
  if (!audio) return;

  console.log("Audio duration:", audio.duration);
  setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
};

  const handleEnded = () => {
  if (playing !== null && playing < tracks.length - 1) {
    setProgress(0);
    setPlaying(playing + 1);
  } else {
    setPlaying(null);
    setProgress(0);
  }
};

  const seek = (value: number) => {
  const audio = audioRef.current;
  if (!audio || !Number.isFinite(audio.duration)) return;

  audio.currentTime = value;
  setProgress(value);
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

        <a href="#sounds" className="navLink">
          Sounds
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

        <div className="trackGrid">
          {tracks.map((track, index) => (
            <article
              className="track"
              key={track.title}
            >
              <div
                className="cover"
                style={{
                  background: track.cover,
                }}
              >
                <div className="coverMark">
                  THA
                  <br />
                  SOUNDS
                </div>

                <button
                  aria-label={`Play ${track.title}`}
                  className="coverPlay"
                  onClick={() => toggleTrack(index)}
                >
                  {playing === index ? (
                    <Pause size={19} fill="currentColor" />
                  ) : (
                    <Play size={19} fill="currentColor" />
                  )}
                </button>
              </div>

              <div className="trackName">
                <div>
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                </div>

                <button
  aria-label="Like track"
  className="likeButton"
  onClick={() => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  }}
>
  <Heart
    size={18}
    fill={liked ? "currentColor" : "none"}
  />
</button>
              </div>

              <div className="trackMeta">
  <span>{track.type} · {track.genre}</span>

  <div>
    <span>
      {likes} {likes === 1 ? 'LIKE' : 'LIKES'} · {track.time}
    </span>

    <button
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

          <div className="bar">
  <input
    type="range"
    min={0}
    max={duration || 0}
    step={0.1}
    value={Math.min(progress, duration || 0)}
    onChange={(event) => seek(Number(event.target.value))}
    onInput={(event) => seek(Number(event.currentTarget.value))}
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
    </main>
  );
}
