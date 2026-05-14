# Widevine VMP Lab

A lightweight, browser-based tool for testing DRM playback using Shaka Player and inspecting the Widevine VMP status.

## Overview

This page provides a simple interface for playing Widevine-protected test content while logging requests/reposnses as
well the status of the Verified Media Path (VMP) of the implementation.

## Features

* Play a selection of official Widevine test content.
* Select UAT or Production Widevine backends.
* Log DRM requests/responses, including the VMP status of delivered content licenses and CDM version.
* Environment panel showing browser name/version, Widevine key system availability, and A/V codec support.
* Download a Markdown report of the environment status and log output.

## Usage

1. Open the page in a browser
2. The **Environment** panel on the right automatically shows browser info, Widevine key system availability, and A/V codec support.
3. Select:
   * Content to play from the **Content List** dropdown.
   * The backend to use from the **Backends** dropdown.
4. Click **Load Content**
5. Observe the **Log Output** below the player — this includes the Widevine message types, VMP status, and CDM version.
6. Optionally play the loaded content using the media controls.
7. Optionally click **Download Report** to save a Markdown report of the environment status and log. Alt+Click opens it in a new tab instead.

## Local Testing

The `tools/` directory in this project includes a small helper script, `serve-https.py`, for running a local HTTPS
server. This is required because modern browsers enforce HTTPS for encrypted media playback (EME / Widevine).

### Prerequisites

You need a locally trusted certificate. The easiest way to generate one is with **mkcert**, which can be installed with
your favourite package manager.

Then install the local certificate authority:

```
mkcert -install
```

### Generate Certificates

Run the following in your project directory:

```
(cd tools/ && mkcert localhost)
```

This will generate two files in `tools/`:

* `localhost.pem` (certificate)
* `localhost-key.pem` (private key)

### Running the HTTPS Server

Start the server and point it to the `web/` directory:

```
tools/serve-https.py web/
```

By default, the server will:

* Serve content from the specified directory (`web/`)
* Use the generated `localhost.pem` and `localhost-key.pem`
* Be accessible at:

```
https://localhost:8443
```

### Notes

* The certificate is trusted locally via mkcert, so browsers should not show warnings.
* If you change hostnames (e.g. use an IP), you must generate a new certificate:

  ```
  mkcert 127.0.0.1
  ```
* Do **not** commit the generated `.pem` files to version control.

## Electron for Content Security (ECS) Testing

The `tools/ecs/` directory contains a couple of helper scripts to be able to easily execute an ECS build with either a
local or GitHub Pages instance.

### Prerequisites

You need an appropriate [ECS release](https://github.com/castlabs/electron-releases/releases) for your platform
downloaded and extracted on your system.

### Running ECS

Run the ECS main executable and provide the path of either `tools/ecs/gh-main.js` or `tools/ecs/local-main.js` as an
argument.

For example (macOS):

```
/path/to/Electron.app/Contents/MacOS/Electron tools/ecs/gh-main.js
```

Or:

```
open -a /path/to/Electron.app --args /path/to/tools/ecs/gh-main.js
```

Windows and Linux versions of ECS can be similarly executed.


