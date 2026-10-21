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
      `}</style>
    </main>
  );
}


