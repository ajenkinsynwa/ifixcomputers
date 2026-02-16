import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  @ViewChild('bannerVideo') private readonly bannerVideo?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.bannerVideo?.nativeElement;
    if (!video) return;

    const playVideo = () => {
      void video.play().catch(() => {
        // Some browsers still block autoplay despite muted; keep the fallback sources available.
      });
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.addEventListener(
      'error',
      () => {
        const firstSource = video.querySelector('source');
        if (!firstSource) return;

        if (firstSource.getAttribute('src') !== 'assets/newifix.mp4') {
          firstSource.setAttribute('src', 'assets/newifix.mp4');
          video.load();
          playVideo();
        }
      },
      { once: true },
    );

    video.addEventListener('canplay', playVideo, { once: true });
    playVideo();
  }
}
