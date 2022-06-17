import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isDesktopView: boolean = false;
  isOpen: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menu: any;

  // Menu policy should come from server side
  adminMenu = [
    {
      path: 'admin/companies',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAABV0lEQVR4nO3aQW7CQBBEUUC5/5XJGks0iHjib/TelsRKVJTaPZrLBQA+c93hGfcdnrGnPf6nw9yO/gN4JJAYgcQIJEYgMQKJEUjMO+/stT3jr9J7iobECCRGIDECiRFIjEBiBBLzs+CZ2/f87R6z+vNT05AYgcQIJMZZVoyGxAgkRiAxK/aQs/nvGTnOMA2JsanHaEiMQGIEEiOQGIHE2ENib30aErOiIa++Ias/PzUNiTFDYo3VkBhnWTEaEmOGxBqrITECiRFIjBliD2Hi5qJbJ0zMEHsIE2dZMRoSY4bYQ5gIJEYgMWZI7K1PQ2Lcy4rRkBgzJNZYDYlxlhWjITFmSKyxGhIjkBiBxJgh9hAm7mW5l8XEDLGHMDniLOvZz229+3tfNeM0JMYMsYcwEUiMQGLMEHsIE4HECCTmiJuLtefbQ3hOIDECiRFIjEBiBBIjEAD4Er+fgFPDPkI6MQAAAABJRU5ErkJggg==',
      name: 'Company',
    },
    {
      path: 'admin/categories',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAFV0lEQVR4nO2cPYxVRRTHf7uIrIiACor4HRBRo4tgglEbEi0otDG2FhYWNJbGwsTSxMLYaCy0wMTCxgILE4KJBj8K/IoYiR/RiICiZkHQdZHdtTh34sv67nv33vnfmbnvzS853cvMOefee97MmXMGMplMJpPJZDKZTCaTyWQyFdlSSCYw9wFvAOeBBWA/8CAwEVOpUWcKeBT4Algska+BJ4CLI+k4kmwEngF+o9zxS+U08AJwQwR9R4YdwF7gH6o7fqnMA/uA+8nhqRIrgEeAj2ju9DL5FHgcWBnMmg6xAXgSOIbe8UvlJPAscG0QyxJnB/AyMEv7jl8q57CV1L2tW5kYy7Al437CO71MDmErrOUt2h2d9ViY+ZH4Di+TE1h42tiSD6IwjYWZP4nv4KryNxaedrbgjyBM8l+YWSC+QxXh6QKph1piNbYT/Z74jlPLMWxDeJnMW0I2YzvPM8R3VNsyi20Qb5N4zoMJbIe5j+6HmaZyENs4LvP0ZS1WYTvKwyIjRkG+wVZ4az38OpQbsSXa7wkYnKr8ga34tjb0cV92AW9iia3YBnZF5guf7Rrm3CoZwsUKv8mUM9DHk6G0yPQnP4DI5AcQmfwAIpMfQGSqPIC7gNewEpBMNRaAt4AHlINeRf3qhHGTINUYKxhenzNuEq0eqbdCLbYTQss8CVXkbcLyRDPEd0zbcgbL99wq8ZyYS7BM6VfEd5RavsMynpfKvNUik4zOWYHL+XfiSLIfW7CVQdcO5fcCd7Tgj9psF42zDngKOEp8B5fJ0ULHdSKb71EMsoi2cKm3YiK2w50o7bsQC1kfFGN706vocWwzpnpDthOvNHEOW0JL3lLgCuxPeukX7s2gGHm7YgLgSkz5n0rmU8ov2JL5GpHud2Iv0V8l83kzzCBlZYD7fD+sMG9dceXpFwn0rBNGvalqoFsnqwqX1A0aCpoUnnlT12j1TjGFFqWbivHO1tAh2gNwou5eDN2kp9pMeqOIv+psYZttqq7w7Es0tnvzNLb8VCgzAzyHLjQoG7U3Ac8Dp9DYehzznQS3OjkoUi6l7kV1Sv1j7Auaakthtzo5J1L4M8J3L7pDpc9FNpxHu9qqxAZsdfKryIgZbKVxXYd0PhVA56F04W1Sf7VHsEVFcj3HLp76bJ565RDN46n733pfpEtSR5DDUJey/1yMd3WFucuSYk3lNC2UnIdC3czhMph395lrG4OTYnUlSNNFKCaA3cDb6I4o3wUeLuQ90ZgLhY67SSjMvIq9XSq2Ai/SLK/SlpwtdFKGmZ3A64qBnJLqftkUWlrVrafL+f+G1ZsypS9XDE6cpm71y7QWe5n6XcPgzaDP9iXgFsUkBduwkNfGEeUs+nA6DbwyRF9vqhin7pdVXuyhvoCjbpramzrGfou2eqxfTK0TZpRJsdXFeEdq6uFNk7fO9csqw1OVdEIbaYzN+NW9euPz+bexfXcJtZM987hEnvIaMlWa2ps5TwWcHEabdp4CHitEFWZWAXvQFRfPKZRS1+y4FO71CuVEuIN/Ve7K1R5JLwZU1+yoS0aaoCh96RVl7VFQxT8JpTj6u0mjvkhNanaCf7oF6rtJk7oeuUrNTh1RFs6q7yZN/oJwdZVBk9Jx9d2knToNc6gb905g4W79gDkHJcWaSNINeVVRN+650vjpnjluRtsG1amGvKpMAg8BB9A4aRF4pxDVeAcKHUf+Do2UGveSasgLzRosZv9AeMer2606TcjGvbG4Kd2HNhr31A15Y4EiCahuyBtLmiQBQ+aWxopBScAUsqtjQ+/tXSmeL4wNK0mwRDyTyWQymUwmk8lkBvEvSkyN0R1JJP4AAAAASUVORK5CYII=',
      name: 'Category',
    },
    {
      path: 'admin/users',
      icon: 'data:image/png;base64,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',
      name: 'Users',
    },
    {
      path: 'admin/banks',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAB2ElEQVR4nO3bu03DUBhA4QNCQAEsABNQ0TILKxAyDDOwCo8KaJiACUgaKijCIzaK7cTXvy/2+aRbIJEr+2CR+JcDkiRJkiRJw7cPTIEHYA58jGDNgXvgCthrn7DeCfAcdHK5rqevDp3Zx8jLsTu7sqcZnGBOa9Iu52oPGZxcTuuuXc5fW6WfZ8BBqs0HYA4cptioHPojxaYDU260ke0Um6ieoSVJQ7T8eTt8TjImq25yOp+TjE3VHWWnc5Kx6W1OMjZhc5Kxqws9W/5lZx31Vs06mrT6ea234EEMHWSn7wP4x9Yan3pFBzF0EEMHMXQQQwcxdBBDBzF0EG9YNuesI0eGDmLoIIYOYugghg5i6CCGDmLoIIYOYugghg5i6CCGDlIOPe/lKPL1lmqjcuiXVBsPRLIe5dA3qTYeiM567LF4Wr3v72DnsB6B3YpWTfaodIKxH4Hjmk6tQ8Piyp6weGp9lsGJR6wZcAtcUn0lf0sSWtWOWDO0n6M3c7ruCwy9mYu+D2AMzoB3/B/dqTPgleZvsFrDAXAOXNP8Sv4TOuUjYf4FK/hmGMTQQVKGdsRaVBixpgztiLWo0CNlaEesRY5YA1bdiLU1R6zNRqxJOGKVJEmSJEkauE9RkU3u82Ri0QAAAABJRU5ErkJggg==',
      name: 'Banks',
    },
  ];

  constructor(private observer: BreakpointObserver, public router: Router) {
    this.menu = this.adminMenu;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Check mobile view or Desktop View
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.close();
        this.isDesktopView = false;
        this.sidenav.mode = 'over';
      } else {
        this.isDesktopView = true;
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  // Toggle the side bar menu
  sidenavToggle() {
    if (this.isDesktopView) {
      this.isOpen = !this.isOpen;
      this.sidenav.open();
    } else {
      this.sidenav.toggle();
    }
  }

  // Go to the passed route
  goTo(route: string) {
    this.router.navigateByUrl(route);
    if (!this.isDesktopView) {
      this.sidenav.close();
    }
  }
}
