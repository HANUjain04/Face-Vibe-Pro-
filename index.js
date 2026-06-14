<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>FaceVibe Pro - AI Intelligence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Added html2canvas for Shareable Glow-Up Cards -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #020617;
            color: #f8fafc;
            overscroll-behavior-y: none;
        }
        
        .glass-panel {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 229, 255, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        .glass-card {
            background: linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
        }

        .neon-text-cyan { text-shadow: 0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3); }
        .neon-text-purple { text-shadow: 0 0 10px rgba(124, 77, 255, 0.5), 0 0 20px rgba(124, 77, 255, 0.3); }

        .neon-border {
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(0, 229, 255, 0.1);
            border: 1px solid rgba(0, 229, 255, 0.4);
        }

        @keyframes scan-laser {
            0% { top: 0%; box-shadow: 0 0 20px #00E5FF, 0 0 40px #00E5FF; background: #00E5FF; }
            50% { top: 100%; box-shadow: 0 0 20px #7C4DFF, 0 0 40px #7C4DFF; background: #7C4DFF; }
            100% { top: 0%; box-shadow: 0 0 20px #00E5FF, 0 0 40px #00E5FF; background: #00E5FF; }
        }
        
        .laser-line {
            position: absolute;
            left: 0; right: 0; height: 2px; z-index: 50;
            animation: scan-laser 2.5s infinite ease-in-out;
        }

        .grid-bg {
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .radar-polygon {
            fill: rgba(0, 229, 255, 0.2); stroke: #00E5FF; stroke-width: 2; transition: all 1s ease-out;
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Age Progression Filters */
        .age-filter-20 { filter: contrast(1.05) brightness(1.05) saturate(1.1); }
        .age-filter-40 { filter: contrast(1.0) brightness(0.95) saturate(0.9) grayscale(0.1); }
        .age-filter-60 { filter: contrast(1.1) brightness(0.9) saturate(0.8) grayscale(0.2) sepia(0.1); }
        .age-filter-80 { filter: contrast(1.2) brightness(0.85) saturate(0.6) grayscale(0.3) sepia(0.2); }

        .tab-content { display: none; opacity: 0; transition: opacity 0.3s ease-in-out; }
        .tab-content.active { display: flex; opacity: 1; }
        
        #routine-overlay {
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #routine-overlay.active { transform: translateY(0); }
        
        /* Hidden Share Card Container */
        #share-card-container {
            position: absolute; top: -9999px; left: -9999px; z-index: -100;
        }
    </style>
</head>
<body class="grid-bg selection:bg-cyan-500/30 flex items-center justify-center sm:p-4 min-h-screen">
    
    <div class="w-full max-w-md h-[100dvh] sm:h-[850px] bg-slate-950 sm:rounded-[2.5rem] relative shadow-[0_0_100px_rgba(0,0,0,0.8)] sm:border-[6px] border-slate-800 overflow-hidden flex flex-col">
        
        <!-- Header -->
        <div class="h-12 w-full flex items-center justify-between px-6 z-20 pt-2 shrink-0">
            <div class="font-bold tracking-widest text-sm uppercase text-slate-300">
                Face<span class="text-cyan-400">Vibe</span> <span class="bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">PRO</span>
            </div>
            <button id="btn-reset" class="text-slate-400 hover:text-white transition-colors hidden" title="New Scan">
                <i data-lucide="refresh-cw" class="w-[18px] h-[18px]"></i>
            </button>
        </div>

        <!-- Dynamic Content -->
        <div class="flex-1 relative overflow-hidden" id="main-content">
            
            <!-- Scan Tab -->
            <div id="tab-scan" class="tab-content active relative h-full w-full flex-col items-center justify-center p-6 overflow-hidden">
                <div id="scan-pre-text" class="absolute top-8 left-0 right-0 z-10 flex flex-col items-center text-center px-4">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider mb-3 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> ENCRYPTED LOCALLY
                    </div>
                    <h1 class="text-3xl font-bold tracking-tight mb-2">AI Face Scanner</h1>
                    <p class="text-slate-400 text-sm">Scan your face or upload a photo for deep intelligence analysis.</p>
                </div>

                <div id="camera-container" class="relative w-full max-w-sm aspect-[3/4] rounded-[2rem] overflow-hidden border border-slate-700 transition-all duration-500 shadow-2xl bg-slate-900 mt-12">
                    <video id="camera-feed" autoplay playsinline muted class="w-full h-full object-cover transform -scale-x-100"></video>
                    <img id="captured-image-preview" src="" class="w-full h-full object-cover hidden" alt="Captured" />

                    <div id="scan-overlay" class="hidden">
                        <div class="absolute inset-0 bg-cyan-900/20 mix-blend-overlay"></div>
                        <div class="laser-line"></div>
                        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMjI5LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-50 z-10"></div>
                        <div class="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950/50 backdrop-blur-sm">
                            <div class="relative flex items-center justify-center w-24 h-24 mb-4">
                                <svg class="animate-spin absolute w-full h-full text-cyan-400/20" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <div id="scan-progress-text" class="text-3xl font-bold text-cyan-400 drop-shadow-lg">0%</div>
                            </div>
                            <p id="scan-status-text" class="text-xs text-cyan-200 uppercase tracking-widest text-center px-6 animate-pulse"></p>
                        </div>
                    </div>
                </div>

                <div id="scan-actions" class="absolute bottom-24 left-0 right-0 flex justify-center items-end gap-6 z-10 px-8">
                    <label class="relative group w-14 h-14 rounded-full bg-violet-500/10 border border-violet-400/50 flex flex-col items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg backdrop-blur-md mb-2">
                        <div class="absolute inset-0 bg-violet-400/10 group-hover:bg-violet-400/20 transition-colors"></div>
                        <i data-lucide="image" class="text-violet-300 w-5 h-5 mb-0.5 z-10"></i>
                        <span class="text-[8px] font-bold text-violet-300 uppercase tracking-wider z-10">Upload</span>
                        <input type="file" id="file-upload" accept="image/*" class="hidden" />
                    </label>

                    <button id="btn-capture" class="relative group w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                        <div class="absolute inset-0 bg-cyan-400/20 group-hover:bg-cyan-400/30 transition-colors"></div>
                        <div class="w-14 h-14 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.6)] flex items-center justify-center z-10">
                            <i data-lucide="maximize" class="text-slate-900 w-6 h-6"></i>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Other Tabs -->
            <div id="tab-dashboard" class="tab-content h-full w-full overflow-y-auto hide-scrollbar p-6 pb-24 flex-col"></div>
            <div id="tab-aging" class="tab-content h-full w-full flex-col p-6 pb-24"></div>
            <div id="tab-skin" class="tab-content h-full w-full overflow-y-auto hide-scrollbar p-6 pb-24 flex-col"></div>
            <div id="tab-match" class="tab-content h-full w-full overflow-y-auto hide-scrollbar p-6 pb-24 flex-col"></div>

            <!-- Skincare Routine Overlay -->
            <div id="routine-overlay" class="absolute inset-0 bg-slate-950/95 backdrop-blur-xl z-40 hidden flex-col overflow-y-auto hide-scrollbar pb-24 px-6 pt-6">
                <div class="flex justify-between items-center mb-6 sticky top-0 bg-slate-950/90 py-2 z-10">
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight text-white">Daily Routine</h2>
                        <p class="text-sm text-cyan-400">AI Prescribed Regimen</p>
                    </div>
                    <button id="btn-close-routine" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
                <div class="space-y-6" id="routine-content"></div>
            </div>

            <!-- Lock Screen -->
            <div id="lock-screen" class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/90 backdrop-blur-md z-50 hidden">
                <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <i data-lucide="shield-alert" class="w-10 h-10 text-cyan-500"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2">Scan Required</h2>
                <p class="text-slate-400 mb-8 text-sm max-w-[250px]">Capture or upload a face scan to unlock premium AI insights.</p>
                <button id="btn-unlock-scan" class="bg-cyan-500 text-slate-950 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                    Go to Scanner
                </button>
            </div>
            
            <!-- Hidden Loading Overlay for Card Export -->
            <div id="export-loading" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] hidden flex-col items-center justify-center text-cyan-400">
                <i data-lucide="loader" class="w-8 h-8 animate-spin mb-2"></i>
                <span class="text-xs font-bold tracking-widest uppercase">Generating Card...</span>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <nav class="absolute bottom-0 left-0 right-0 h-20 glass-panel border-t border-white/5 flex items-center justify-around px-2 z-30 pb-safe">
            <button class="nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300" data-target="dashboard">
                <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                <span class="text-[10px] font-medium uppercase tracking-wider">Report</span>
            </button>
            <button class="nav-btn nav-scan-btn active relative -top-5 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-110" data-target="scan">
                <i data-lucide="camera" class="w-6 h-6"></i>
            </button>
            <button class="nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300" data-target="skin">
                <i data-lucide="droplets" class="w-5 h-5"></i>
                <span class="text-[10px] font-medium uppercase tracking-wider">Skin</span>
            </button>
            <button class="nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300" data-target="aging">
                <i data-lucide="history" class="w-5 h-5"></i>
                <span class="text-[10px] font-medium uppercase tracking-wider">Aging</span>
            </button>
            <button class="nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300" data-target="match">
                <i data-lucide="users" class="w-5 h-5"></i>
                <span class="text-[10px] font-medium uppercase tracking-wider">Match</span>
            </button>
        </nav>
    </div>

    <!-- Hidden template for html2canvas generation -->
    <div id="share-card-container">
        <div id="share-card-content" class="w-[400px] h-[700px] bg-slate-950 border-4 border-slate-800 p-8 flex flex-col relative overflow-hidden" style="font-family: 'Space Grotesk', sans-serif; color: white;">
            <!-- Background glows -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/30 blur-[80px] rounded-full"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/30 blur-[80px] rounded-full"></div>
            
            <div class="text-center z-10 mb-8">
                <h1 class="text-3xl font-bold tracking-widest uppercase">Face<span style="color:#00E5FF">Vibe</span> <span style="background: linear-gradient(to right, #00E5FF, #7C4DFF); -webkit-background-clip: text; color: transparent;">PRO</span></h1>
                <p class="text-sm text-slate-400 mt-1 uppercase tracking-widest">Official AI Analysis</p>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center z-10">
                <div class="relative w-40 h-40 mb-6">
                    <img id="share-card-img" src="" class="w-full h-full object-cover rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.4)]" />
                    <div class="absolute -bottom-2 -right-2 bg-slate-900 border-2 border-cyan-400 w-12 h-12 rounded-full flex items-center justify-center">
                        <span id="share-card-score" class="font-bold text-cyan-400 text-lg">91</span>
                    </div>
                </div>
                
                <div class="w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-4 mb-4 backdrop-blur-md text-center">
                    <p class="text-xs text-slate-400 uppercase tracking-widest mb-1">Visual Age</p>
                    <p class="text-2xl font-bold text-white"><span id="share-card-age">21</span> <span class="text-sm font-normal text-slate-500">Years</span></p>
                </div>
                
                <div class="w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-4 backdrop-blur-md">
                    <p class="text-xs text-slate-400 uppercase tracking-widest mb-3 text-center">Top Features</p>
                    <ul id="share-card-features" class="space-y-2 text-sm text-slate-200">
                        <!-- Injected -->
                    </ul>
                </div>
            </div>
            
            <div class="text-center z-10 mt-6 pt-4 border-t border-slate-800">
                <p class="text-xs text-slate-500">Scan generated at FaceVibe.app</p>
            </div>
        </div>
    </div>

    <!-- Script -->
    <script>
        // --- MOCK DATA & STATE ---
        const DEMO_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600';
        
        const CELEBRITIES = [
            { name: 'Henry Cavill', match: 92, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150' },
            { name: 'Zendaya', match: 88, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=150&h=150' },
            { name: 'Timothée C.', match: 85, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?fit=crop&w=150&h=150' },
        ];

        let MOCK_RESULTS = {
            overall: 91, biologicalAge: 24, visualAge: 21, skinAge: 19,
            categories: { eyes: 92, nose: 85, lips: 88, jawline: 95, skin: 90, symmetry: 87, hair: 82 },
            skinMetrics: { hydration: 92, elasticity: 88, glow: 85, smoothness: 90, evenTone: 86 },
            insights: {
                strengths: ["Striking Jawline Projection", "High Facial Symmetry", "Excellent Skin Hydration"],
                improvements: ["Slight Under-eye Fatigue", "Uneven Texture on Forehead"]
            }
        };

        let scanHistory = JSON.parse(localStorage.getItem('facevibe_history')) || [];
        let activeTab = 'scan';
        let isScanning = false;
        let hasResult = false;
        let capturedImage = null;
        let streamRef = null;

        const videoElement = document.getElementById('camera-feed');
        const tabs = document.querySelectorAll('.tab-content');
        const navBtns = document.querySelectorAll('.nav-btn');
        lucide.createIcons();

        // --- CORE FUNCTIONS ---
        
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                videoElement.srcObject = stream;
                streamRef = stream;
            } catch (err) {
                console.warn('Camera access denied. Demo logic applies.');
            }
        }

        function stopCamera() {
            if (streamRef) {
                streamRef.getTracks().forEach(track => track.stop());
                streamRef = null;
            }
        }

        function saveToHistory(result) {
            scanHistory.push({ date: new Date().toISOString(), result: JSON.parse(JSON.stringify(result)) });
            if (scanHistory.length > 10) scanHistory.shift();
            localStorage.setItem('facevibe_history', JSON.stringify(scanHistory));
        }

        function captureAndAnalyze() {
            if (streamRef) {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth; canvas.height = videoElement.videoHeight;
                canvas.getContext('2d').drawImage(videoElement, 0, 0);
                capturedImage = canvas.toDataURL('image/jpeg');
                stopCamera(); // Immediate release of camera resource
            } else if (!capturedImage) {
                capturedImage = DEMO_IMAGE;
            }

            // Randomize slightly per scan
            const variance = Math.floor(Math.random() * 10) - 5;
            MOCK_RESULTS.overall = Math.min(100, Math.max(60, 85 + variance));
            MOCK_RESULTS.visualAge = Math.max(18, 24 + Math.floor(variance/2));
            Object.keys(MOCK_RESULTS.skinMetrics).forEach(key => {
                MOCK_RESULTS.skinMetrics[key] = Math.min(100, Math.max(50, 80 + Math.floor(Math.random() * 15)));
            });

            isScanning = true;
            videoElement.classList.add('hidden');
            document.getElementById('captured-image-preview').src = capturedImage;
            document.getElementById('captured-image-preview').classList.remove('hidden');
            
            document.getElementById('scan-pre-text').style.display = 'none';
            document.getElementById('scan-actions').style.display = 'none';
            document.getElementById('scan-overlay').classList.remove('hidden');
            document.getElementById('camera-container').classList.add('neon-border');
            
            const statuses = ["Initializing Face Mesh...", "Mapping Landmarks...", "Calculating Proportions...", "Analyzing Skin...", "Predicting Age...", "Finalizing Report..."];
            let step = 0, progress = 0;
            
            const interval = setInterval(() => {
                step++;
                progress = Math.min(progress + 18, 100);
                document.getElementById('scan-progress-text').innerText = Math.round(progress) + '%';
                if (step < statuses.length) document.getElementById('scan-status-text').innerText = statuses[step];
                
                if (step >= 6) {
                    clearInterval(interval);
                    setTimeout(() => {
                        isScanning = false;
                        hasResult = true;
                        saveToHistory(MOCK_RESULTS); // Save to local storage
                        
                        renderDashboard();
                        renderAging();
                        renderSkin();
                        renderMatch();
                        renderRoutine();
                        
                        document.getElementById('btn-reset').classList.remove('hidden');
                        setActiveTab('dashboard');
                    }, 800);
                }
            }, 800);
        }

        function setActiveTab(targetId) {
            document.getElementById('routine-overlay').classList.remove('active');
            setTimeout(() => document.getElementById('routine-overlay').style.display = 'none', 300);

            if (!hasResult && targetId !== 'scan') {
                document.getElementById('lock-screen').classList.remove('hidden');
                tabs.forEach(tab => tab.classList.remove('active'));
                return;
            }
            document.getElementById('lock-screen').classList.add('hidden');
            tabs.forEach(tab => tab.classList.toggle('active', tab.id === 'tab-' + targetId));

            navBtns.forEach(btn => {
                const isActive = btn.dataset.target === targetId;
                if (btn.dataset.target === 'scan') {
                    btn.className = isActive 
                        ? "nav-btn nav-scan-btn active relative -top-5 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-110"
                        : "nav-btn nav-scan-btn relative -top-5 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 bg-slate-800 text-slate-400 border-2 border-slate-700 hover:text-white";
                } else {
                    btn.className = isActive 
                        ? "nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300 text-cyan-400 scale-105"
                        : "nav-btn flex flex-col items-center gap-1 p-2 w-16 transition-all duration-300 text-slate-500 hover:text-slate-300";
                }
            });

            activeTab = targetId;
            if (activeTab === 'scan' && !hasResult && !isScanning) startCamera();
            else stopCamera();
        }

        function resetApp() {
            hasResult = false; capturedImage = null;
            videoElement.classList.remove('hidden');
            document.getElementById('captured-image-preview').classList.add('hidden');
            document.getElementById('scan-pre-text').style.display = 'flex';
            document.getElementById('scan-actions').style.display = 'flex';
            document.getElementById('scan-overlay').classList.add('hidden');
            document.getElementById('camera-container').classList.remove('neon-border');
            document.getElementById('btn-reset').classList.add('hidden');
            setActiveTab('scan');
        }

        // --- GLOBAL EVENT DELEGATION (Efficiency Fix) ---
        document.addEventListener('click', (e) => {
            // Skincare Routine overlay
            if (e.target.closest('#btn-open-routine')) {
                const overlay = document.getElementById('routine-overlay');
                overlay.style.display = 'flex';
                setTimeout(() => overlay.classList.add('active'), 10);
            }
            if (e.target.closest('#btn-close-routine')) {
                const overlay = document.getElementById('routine-overlay');
                overlay.classList.remove('active');
                setTimeout(() => overlay.style.display = 'none', 400);
            }
            // Share Card Generator
            if (e.target.closest('#btn-share-report')) {
                exportShareCard();
            }
        });

        // Use inline event for age slider to prevent duplicate listeners
        window.updateAgeSlider = function(age) {
            document.getElementById('aging-display').innerText = age;
            document.getElementById('aging-display-slider').innerText = age;
            const img = document.getElementById('aging-img');
            img.className = 'w-full h-full object-cover transition-all duration-700 ' + 
                (age < 30 ? 'age-filter-20' : age < 50 ? 'age-filter-40' : age < 70 ? 'age-filter-60' : 'age-filter-80');
            document.getElementById('aging-wrinkles').style.opacity = age > 40 ? (age - 40) / 100 : 0;
        };

        // --- RENDERERS ---

        function exportShareCard() {
            const loading = document.getElementById('export-loading');
            loading.style.display = 'flex';

            // Populate hidden card
            document.getElementById('share-card-img').src = capturedImage;
            document.getElementById('share-card-score').innerText = MOCK_RESULTS.overall;
            document.getElementById('share-card-age').innerText = MOCK_RESULTS.visualAge;
            
            const ul = document.getElementById('share-card-features');
            ul.innerHTML = MOCK_RESULTS.insights.strengths.map(s => 
                `<li class="flex items-center gap-2"><svg class="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${s}</li>`
            ).join('');

            setTimeout(() => {
                const cardNode = document.getElementById('share-card-content');
                html2canvas(cardNode, { scale: 2, backgroundColor: '#020617', useCORS: true }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `FaceVibe_GlowUp_${Date.now()}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    loading.style.display = 'none';
                });
            }, 500); // Small delay to let image load
        }

        function generateHistoryChart() {
            if (scanHistory.length < 2) return '';
            
            const width = 100, height = 40;
            const minScore = Math.min(...scanHistory.map(s => s.result.overall)) - 5;
            const maxScore = Math.max(...scanHistory.map(s => s.result.overall)) + 5;
            
            const points = scanHistory.map((item, i) => {
                const x = (i / (scanHistory.length - 1)) * width;
                const y = height - ((item.result.overall - minScore) / (maxScore - minScore)) * height;
                return `${x},${y}`;
            });

            return `
                <div class="glass-panel rounded-3xl p-6 mb-6">
                    <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">Evolution Tracker</h3>
                    <div class="relative w-full h-24 mb-2">
                        <svg viewBox="0 -5 100 50" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <polyline fill="none" stroke="#00E5FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${points.join(' ')}" class="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                            ${points.map(pt => `<circle cx="${pt.split(',')[0]}" cy="${pt.split(',')[1]}" r="2.5" fill="#020617" stroke="#00E5FF" stroke-width="1.5" />`).join('')}
                        </svg>
                    </div>
                    <div class="flex justify-between text-[10px] text-slate-500 uppercase">
                        <span>First Scan</span>
                        <span>Latest (${MOCK_RESULTS.overall})</span>
                    </div>
                </div>
            `;
        }

        function generateRadarChartSVG(data) {
            const points = Object.values(data);
            const labels = Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1));
            const max = 100, radius = 40, center = 50;
            const getCoords = (angle, value) => ({
                x: center + (radius * (value / max)) * Math.cos(angle - Math.PI / 2),
                y: center + (radius * (value / max)) * Math.sin(angle - Math.PI / 2)
            });
            let svgContent = '';
            [20, 40, 60, 80, 100].forEach(level => {
                const pts = points.map((_, i) => `${getCoords((Math.PI * 2 / points.length) * i, level).x},${getCoords((Math.PI * 2 / points.length) * i, level).y}`).join(' ');
                svgContent += `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />`;
            });
            points.forEach((_, i) => {
                const pt = getCoords((Math.PI * 2 / points.length) * i, 100);
                svgContent += `<line x1="${center}" y1="${center}" x2="${pt.x}" y2="${pt.y}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />`;
            });
            const polygonPoints = points.map((val, i) => `${getCoords((Math.PI * 2 / points.length) * i, val).x},${getCoords((Math.PI * 2 / points.length) * i, val).y}`).join(' ');
            svgContent += `<polygon points="${polygonPoints}" class="radar-polygon" />`;
            points.forEach((val, i) => {
                const pt = getCoords((Math.PI * 2 / points.length) * i, val);
                svgContent += `<circle cx="${pt.x}" cy="${pt.y}" r="1.5" fill="#fff" class="shadow-lg" />`;
            });
            let html = `<div class="relative w-full aspect-square max-w-[280px] mx-auto"><svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">${svgContent}</svg>`;
            labels.forEach((label, i) => {
                const pt = getCoords((Math.PI * 2 / points.length) * i, 115);
                html += `<div class="absolute text-[10px] font-medium text-slate-300 transform -translate-x-1/2 -translate-y-1/2" style="left: ${pt.x}%; top: ${pt.y}%;">${label}</div>`;
            });
            return html + `</div>`;
        }

        function renderDashboard() {
            const dash = document.getElementById('tab-dashboard');
            const offset = 414.69 - (414.69 * MOCK_RESULTS.overall) / 100;
            
            dash.innerHTML = `
                <div class="flex justify-between items-center mb-6">
                    <div><h2 class="text-2xl font-bold tracking-tight">Intelligence Report</h2><p class="text-sm text-cyan-400">FaceVibe Pro Analysis</p></div>
                    <div class="relative">
                        <img src="${capturedImage}" alt="Profile" class="w-12 h-12 rounded-full object-cover border border-cyan-500/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]" />
                        <div class="absolute -bottom-1 -right-1 bg-cyan-400 w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center"><i data-lucide="check" class="text-slate-900 w-2.5 h-2.5"></i></div>
                    </div>
                </div>

                <div class="glass-panel rounded-3xl p-6 mb-6 flex flex-col items-center relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 blur-[50px] rounded-full"></div>
                    <p class="text-sm text-slate-300 mb-2 uppercase tracking-widest z-10">LooksMax Score</p>
                    <div class="relative flex items-center justify-center w-36 h-36 z-10 mb-2">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="66" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8" />
                            <circle cx="72" cy="72" r="66" fill="none" stroke="url(#gradient)" stroke-width="8" stroke-dasharray="414.69" stroke-dashoffset="${offset}" stroke-linecap="round" class="drop-shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all duration-1000 ease-out" />
                            <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#00E5FF" /><stop offset="100%" stop-color="#7C4DFF" /></linearGradient></defs>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center flex-col"><span class="text-5xl font-bold neon-text-cyan">${MOCK_RESULTS.overall}</span><span class="text-[10px] text-cyan-200 uppercase tracking-wider">Top 5%</span></div>
                    </div>
                    <button id="btn-share-report" class="mt-4 flex items-center gap-2 text-xs bg-cyan-500/10 hover:bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30 transition-colors z-10">
                        <i data-lucide="download" class="w-3.5 h-3.5"></i> Export Glow-Up Card
                    </button>
                </div>

                ${generateHistoryChart()}

                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="glass-card rounded-2xl p-4 flex items-center gap-3"><div class="bg-cyan-500/20 p-3 rounded-xl text-cyan-400"><i data-lucide="activity" class="w-5 h-5"></i></div><div><p class="text-xs text-slate-400 uppercase tracking-wider">Visual Age</p><p class="text-xl font-semibold">${MOCK_RESULTS.visualAge} <span class="text-xs text-slate-500 font-normal">yrs</span></p></div></div>
                    <div class="glass-card rounded-2xl p-4 flex items-center gap-3"><div class="bg-violet-500/20 p-3 rounded-xl text-violet-400"><i data-lucide="award" class="w-5 h-5"></i></div><div><p class="text-xs text-slate-400 uppercase tracking-wider">Harmony</p><p class="text-xl font-semibold">9.4<span class="text-xs text-slate-500 font-normal">/10</span></p></div></div>
                </div>

                <div class="glass-panel rounded-3xl p-6 mb-6">
                    <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-6">Category Breakdown</h3>
                    ${generateRadarChartSVG(MOCK_RESULTS.categories)}
                </div>

                <div class="space-y-4 mb-6">
                    <h3 class="text-sm font-semibold text-slate-300 uppercase tracking-widest">AI Insights</h3>
                    <div class="glass-card rounded-2xl p-4 border-l-4 border-l-cyan-400">
                        <div class="flex items-center gap-2 mb-2 text-cyan-400"><i data-lucide="sparkles" class="w-4 h-4"></i> <span class="font-semibold text-sm">Strengths</span></div>
                        <ul class="text-sm text-slate-300 space-y-1 list-disc pl-4">${MOCK_RESULTS.insights.strengths.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="glass-card rounded-2xl p-4 border-l-4 border-l-violet-400">
                        <div class="flex items-center gap-2 mb-2 text-violet-400"><i data-lucide="info" class="w-4 h-4"></i> <span class="font-semibold text-sm">Improvements</span></div>
                        <ul class="text-sm text-slate-300 space-y-1 list-disc pl-4">${MOCK_RESULTS.insights.improvements.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function renderAging() {
            document.getElementById('tab-aging').innerHTML = `
                <div class="mb-6"><h2 class="text-2xl font-bold tracking-tight">Time Travel</h2><p class="text-sm text-cyan-400">Future Self Simulator</p></div>
                <div class="flex-1 relative rounded-[2rem] overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center mb-6 shadow-2xl group">
                    <img id="aging-img" src="${capturedImage}" alt="Aging Simulation" class="w-full h-full object-cover transition-all duration-700 age-filter-20" />
                    <div id="aging-wrinkles" class="absolute inset-0 opacity-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] transition-opacity duration-700 pointer-events-none"></div>
                    <div class="absolute top-4 right-4 glass-panel px-4 py-2 rounded-xl text-2xl font-bold text-white shadow-lg backdrop-blur-md">Age <span id="aging-display">24</span></div>
                    <div class="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700">
                        <div class="flex justify-between text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider"><span>20 yrs</span><span class="text-cyan-400 font-bold"><span id="aging-display-slider">24</span> yrs</span><span>80 yrs</span></div>
                        <input type="range" min="20" max="80" value="24" oninput="updateAgeSlider(this.value)" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
                    </div>
                </div>
            `;
        }

        function renderSkin() {
            document.getElementById('tab-skin').innerHTML = `
                <div class="mb-6"><h2 class="text-2xl font-bold tracking-tight">Dermatology</h2><p class="text-sm text-cyan-400">Deep Skin Analysis</p></div>
                <div class="relative aspect-square max-w-xs mx-auto rounded-3xl overflow-hidden mb-8 border-2 border-slate-700/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
                    <img src="${capturedImage}" alt="Skin Map" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_rgba(239,68,68,0.3)_0%,_transparent_20%),_radial-gradient(ellipse_at_70%_40%,_rgba(239,68,68,0.3)_0%,_transparent_20%)] mix-blend-overlay"></div>
                    <div class="absolute top-2 left-2 bg-red-500/80 text-[10px] uppercase px-2 py-1 rounded text-white font-bold flex items-center gap-1 backdrop-blur-md"><span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> Issue Detected</div>
                    <div class="absolute left-0 right-0 h-1 bg-cyan-400/50 top-0 shadow-[0_0_15px_#00E5FF] animate-[scan_3s_ease-in-out_infinite] mix-blend-screen"></div>
                </div>
                <div class="space-y-4">
                    ${Object.entries(MOCK_RESULTS.skinMetrics).map(([key, value]) => `
                        <div class="glass-card rounded-2xl p-4">
                            <div class="flex justify-between mb-2"><span class="text-sm font-semibold text-slate-300 capitalize">${key.replace(/([A-Z])/g, ' $1').trim()}</span><span class="text-sm text-cyan-400 font-bold">${value}%</span></div>
                            <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" style="width: ${value}%"></div></div>
                        </div>
                    `).join('')}
                </div>
                <button id="btn-open-routine" class="w-full mt-8 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase tracking-wider text-sm hover:bg-cyan-500/20 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.1)] flex items-center justify-center gap-2">
                    <i data-lucide="sparkles" class="w-4 h-4"></i> View Daily Routine
                </button>
            `;
            lucide.createIcons();
        }

        function renderRoutine() {
            const needsHydration = MOCK_RESULTS.skinMetrics.hydration < 85;
            const needsTexture = MOCK_RESULTS.skinMetrics.smoothness < 85;
            document.getElementById('routine-content').innerHTML = `
                <div class="bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-500/30 rounded-3xl p-5 relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-amber-500/20"><i data-lucide="sun" class="w-24 h-24"></i></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-4 text-amber-400"><i data-lucide="sunrise" class="w-5 h-5"></i><h3 class="font-bold text-lg uppercase tracking-widest">Morning (AM)</h3></div>
                        <ul class="space-y-4">
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 font-bold text-sm border border-amber-500/30">1</div><div><p class="font-semibold text-slate-200">Gentle Cleanser</p><p class="text-xs text-slate-400 mt-0.5">Removes overnight impurities.</p></div></li>
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 font-bold text-sm border border-amber-500/30">2</div><div><p class="font-semibold text-slate-200">Vitamin C Serum</p><p class="text-xs text-slate-400 mt-0.5">Brightens skin & protects.</p></div></li>
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 font-bold text-sm border border-amber-500/30">3</div><div><p class="font-semibold text-slate-200">SPF 50+ Sunscreen</p><p class="text-xs text-slate-400 mt-0.5">Crucial daily anti-aging step.</p></div></li>
                        </ul>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-indigo-500/20 to-violet-500/5 border border-indigo-500/30 rounded-3xl p-5 relative overflow-hidden">
                    <div class="absolute -right-4 -top-4 text-indigo-500/20"><i data-lucide="moon" class="w-24 h-24"></i></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-4 text-indigo-400"><i data-lucide="moon-star" class="w-5 h-5"></i><h3 class="font-bold text-lg uppercase tracking-widest">Night (PM)</h3></div>
                        <ul class="space-y-4">
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-sm border border-indigo-500/30">1</div><div><p class="font-semibold text-slate-200">Double Cleanse</p><p class="text-xs text-slate-400 mt-0.5">Oil balm then water-based cleanser.</p></div></li>
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-sm border border-indigo-500/30">2</div><div><p class="font-semibold text-slate-200">${needsTexture ? 'Exfoliating BHA' : 'Retinol Serum'}</p><p class="text-xs text-slate-400 mt-0.5">${needsTexture ? 'Unclogs pores and smooths.' : 'Boosts collagen production.'}</p></div></li>
                            <li class="flex gap-3"><div class="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-sm border border-indigo-500/30">3</div><div><p class="font-semibold text-slate-200">${needsHydration ? 'Hydrating Night Cream' : 'Light Moisturizer'}</p><p class="text-xs text-slate-400 mt-0.5">${needsHydration ? 'Repairs the skin barrier.' : 'Maintains balance.'}</p></div></li>
                        </ul>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function renderMatch() {
            document.getElementById('tab-match').innerHTML = `
                <div class="mb-8 text-center"><h2 class="text-2xl font-bold tracking-tight">Global Match</h2><p class="text-sm text-cyan-400">AI Database Comparison</p></div>
                <div class="flex justify-center mb-10 relative">
                    <div class="relative z-10 w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                        <img src="${capturedImage || DEMO_IMAGE}" alt="You" class="w-full h-full object-cover" />
                    </div>
                </div>
                <div class="space-y-4">
                    <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest pl-2">Top Matches</h3>
                    ${CELEBRITIES.map(celeb => `
                        <div class="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-cyan-500/30 transition-colors cursor-pointer group">
                            <img src="${celeb.image}" alt="${celeb.name}" class="w-16 h-16 rounded-xl object-cover border border-slate-700 group-hover:border-cyan-400/50 transition-colors" />
                            <div class="flex-1"><h4 class="font-semibold text-lg">${celeb.name}</h4><div class="flex items-center gap-2"><div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-cyan-400 rounded-full" style="width: ${celeb.match}%"></div></div><span class="text-xs font-bold text-cyan-400">${celeb.match}%</span></div></div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // --- ATTACH EVENT LISTENERS ---
        document.getElementById('btn-capture').addEventListener('click', captureAndAnalyze);
        document.getElementById('btn-reset').addEventListener('click', resetApp);
        document.getElementById('btn-unlock-scan').addEventListener('click', () => setActiveTab('scan'));
        
        document.getElementById('file-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { capturedImage = e.target.result; captureAndAnalyze(); };
                reader.readAsDataURL(file);
            }
        });

        navBtns.forEach(btn => btn.addEventListener('click', () => setActiveTab(btn.dataset.target)));

        // Load dashboard immediately if history exists
        if (scanHistory.length > 0) {
            MOCK_RESULTS = scanHistory[scanHistory.length-1].result;
            capturedImage = DEMO_IMAGE; // We use demo image to protect base64 localstorage bloat for this prototype
            hasResult = true;
            document.getElementById('btn-reset').classList.remove('hidden');
            renderDashboard(); renderAging(); renderSkin(); renderMatch(); renderRoutine();
            setActiveTab('dashboard');
        } else {
            setActiveTab('scan');
        }
    </script>
</body>
</html>
