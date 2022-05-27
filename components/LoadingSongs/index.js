import { useEffect, useState } from "react";
import NowPlaying from "../NowPlaying";

export default function LoadingSongs() {
  const [songs, setSongs] = useState();

  useEffect(() => {
    fetch(
      "https://denzqfapjoywlunugtbe.supabase.co/rest/v1/Music?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbnpxZmFwam95d2x1bnVndGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1Njc2MTAsImV4cCI6MTk2OTE0MzYxMH0.phhqYflVrlaS3Lb9lsxe21sgJH2ZSW1HKDHN8RQqy1Y"
    )
      .then((response) => response.json())
      .then((responseSongs) => setSongs(responseSongs));
  }, []);

  return <>{songs && <NowPlaying songs={songs} />}</>;
}
