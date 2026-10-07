  'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Heart, Pause, Play, Upload, Volume2 } from 'lucide-react';

const tracks = [
  {
    title: 'Live or Die 2.0 (Revisit)',
    artist: 'ThaMusiq',
    genre: 'Amapiano',
    time: '3:42',
    cover: "url('/live-or-die-2-cover.png') center/cover",
    audio: '/live-or-die-2.mp3',
  },
  
export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentTrack = playing === null ? null : tracks[playing];

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.audio) return;

    audioRef.current.src = currentTrack.audio;
    audioRef.current.volume = volume;

    audioRef.current.play().catch(() => {});
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleTrack = (index: number) => {
    if (!tracks[index].audio) return;

    if (playing === index) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
      } else {
        audioRef.current?.pause();
      }
    } else {
      setPlaying(index);
      setProgress(0);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const seek = (value: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <main>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(null)}
      />

      <header className="nav shell">
        <a className="brand" href="#top">
          <strong>THA</strong> SOUNDS
          <span>The House of Audio</span>
        </a>

        <nav>
          <a href="#music">Music</a>
          <a href="#artists">Artists</a>
          <a href="#upload">Upload</a>
        </nav>

        <a className="navUpload" href="#upload">
          <Upload size={15} /> Add your sound
        </a>
      </header>

      <section id="top" className="hero shell">
        <div className="heroWords">
          <p className="tag">THE HOUSE OF AUDIO</p>

          <h1>
            home
            <br />
            <i>of music.</i>
          </h1>

          <p className="intro">
            A place for sounds, artists and people who just love music.
            Welcome to the house.
          </p>

          <div className="heroLinks">
            <a className="blackBtn" href="#music">
              <Play size={16} fill="currentColor" /> Listen now
            </a>

            <a className="textBtn" href="#upload">
              Bring your sound <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="faceCard">
          <img src="/tha-sound-cartoon.png" alt="THA SOUND" />

          <div className="faceShade" />

          <div className="faceTop">
            THA SOUNDS <span>01</span>
          </div>

          <div className="faceBottom">
            <div>
              <small>FOUNDER / ARTIST</small>
              <h2>ThaMusiq</h2>
            </div>

            <div className="signature">THA.</div>
          </div>
        </div>
      </section>

      <section className="statement shell">
        <p>
          THA SOUNDS is <b>my house for music.</b> I make the space — artists
          bring the sound.
        </p>
      </section>

      <section id="music" className="section shell">
        <div className="sectionTitle">
          <div>
            <span>THE HOUSE</span>
            <h2>Sounds inside.</h2>
          </div>

          <a href="#">
            See everything <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="trackGrid">
          {tracks.map((track, i) => (
            <article className="track" key={track.title}>
              <div className="cover" style={{ background: track.cover }}>
                <div className="coverMark">
                  THA
                  <br />
                  SOUNDS
                </div>

                <button
                  aria-label={`Play ${track.title}`}
                  className="coverPlay"
                  onClick={() => toggleTrack(i)}
                >
                  {playing === i ? (
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

                <button>
                  <Heart size={16} />
                </button>
              </div>

              <div className="trackMeta">
                <span>{track.genre}</span>
                <span>{track.time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="artists" className="people shell">
        <div className="peopleIntro">
          <span>THE PEOPLE</span>

          <h2>
            Good music
            <br />
            <i>lives here.</i>
          </h2>

          <p>
            ThaMusiq is at the front of the house. Everyone else is welcome
            through the door.
          </p>
        </div>

        <div className="peopleList">
          <div className="person featured">
            <b>01</b>
            <strong>ThaMusiq</strong>
            <small>Founder · Amapiano</small>
            <ArrowUpRight size={17} />
          </div>
 </section>

      <section id="upload" className="drop shell">
        <div className="dropInner">
          <span>YOUR TURN</span>

          <h2>
            Bring something
            <br />
            <i>to the house.</i>
          </h2>

          <p>
            Got a song? Put it here. THA SOUNDS is open to artists who want
            their music heard.
          </p>

          <button className="blackBtn">
            <Upload size={16} /> Upload your music
          </button>
        </div>

        <div className="scribble">
          MAKE
          <br />
          SOME
          <br />
          NOISE.
        </div>
      </section>

      <footer className="footer shell">
        <div>
          <strong>THA SOUNDS</strong>
          <span>The House of Audio</span>
        </div>

        <p>
          <i>home of music</i> · © 2026
        </p>

        <div className="footerRight">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
      </footer>

      <div className="player">
        <div className="now">
          <div
            className="nowArt"
            style={{
              background:
                currentTrack?.cover ||
                'linear-gradient(145deg,#a7a7a7,#292929)',
            }}
          />

          <div>
            <b>
              {currentTrack
                ? currentTrack.title
                : 'THA SOUNDS'}
            </b>

            <span>
              {currentTrack
                ? currentTrack.artist
                : 'Pick a sound'}
            </span>
          </div>
        </div>

        <button
          className="nowPlay"
          onClick={() => {
            if (playing === null) {
              toggleTrack(0);
            } else {
              toggleTrack(playing);
            }
          }}
        >
          {playing !== null && !audioRef.current?.paused ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>

        <div className="bar">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
          />

          <span>
            {formatTime(progress)} / {formatTime(duration)}
          </span>
        </div>

        <Volume2 size={16} className="volume" />

        <input
          className="volumeSlider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </main>
  );
}


